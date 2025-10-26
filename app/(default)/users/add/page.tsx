"use client";

import { Button, Card, CardBody, Form } from "@heroui/react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import AppTextInput from "@/components/common/app-text-input";
import AppTextarea from "@/components/common/app-textarea";
import { showErrorToast, showSuccessToast } from "@/utils/common";
import { useConfirmation } from "@/context/confirmation-context";
import { RootState } from "@/redux/store";
import { actionButtons, button, form, inputContainer } from "@/utils/primitives";

export default function AddUsersPage() {
  const router = useRouter();
  const store = useSelector((state: RootState) => state.users);
  const { confirm } = useConfirmation();

  useEffect(() => {
    if (store.success) {
      showSuccessToast('Data saved successfully')
      router.push("/users")
    } else if (store.error) {
      showErrorToast(store.error)
    }
  }, [store.loading])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    confirm("Are you sure want to save this data?", () => {
      doSave(data)
    });
  };

  const doSave = (data: any) => {
    showSuccessToast("Data saved successfully!");
    router.push("/users");
  }

  return (
    <div>
      <Card className="px-1">
        <CardBody>
          <Form id="filterForm" onSubmit={handleSubmit}>
            <div className={form()}>
              <div className={inputContainer()}>
                <AppTextInput
                  isRequired
                  key='firstName'
                  name='firstName'
                  label='First Name'
                />
                <AppTextInput
                  isRequired
                  key='lastName'
                  name='lastName'
                  label='Last Name'
                />
                <AppTextInput
                  key='email'
                  name='email'
                  label='Email'
                  type="email"
                />
                <AppTextInput
                  key='phone'
                  name='phone'
                  label='Phone'
                  type="number"
                />
                <AppTextarea
                  key='university'
                  name='university'
                  label='University'
                />
              </div>

              <div className={actionButtons()}>
                <Button
                  type="button"
                  color="primary"
                  variant="flat"
                  className={button()}
                  onPress={router.back}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className={button()}
                  startContent={<Save size={15} />}
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
