"use client";

import { Button, Card, Form } from "@heroui/react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import AppTextInput from "@/components/forms/app-text-input";
import AppTextarea from "@/components/forms/app-textarea";
import { showErrorToast, showSuccessToast } from "@/utils/common";
import { useConfirmation } from "@/context/confirmation-context";
import { RootState } from "@/redux/store";
import { actionButtons, button, form, inputContainer } from "@/utils/primitives";
import { RouteGuardProvider } from "@/context/route-guard-context";

interface Props {
  isEdit?: boolean;
}

function UsersFormContent({ isEdit }: Props) {
  const router = useRouter();
  const store = useSelector((state: RootState) => state.users);
  const { confirm } = useConfirmation();

  useEffect(() => {
    if (store.success) {
      showSuccessToast("Data Saved Successfully");
      router.push("/users");
    } else if (store.error) {
      showErrorToast(store.error);
    }
  }, [store.loading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    confirm({
      message: "Are you sure you want to save this data?",
      onConfirm: () => {
        doSave(data);
      },
    });
  };

  const doSave = (data: any) => {
    showSuccessToast("Data Saved Successfully");
    router.push("/users");
  };

  return (
    <div>
      <Card>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <div className={form()}>
              <div className={inputContainer()}>
                <AppTextInput
                  isRequired
                  name='firstName'
                  label='First Name'
                />
                <AppTextInput
                  isRequired
                  name='lastName'
                  label='Last Name'
                />
                <AppTextInput
                  name='email'
                  label='Email'
                  type="email"
                />
                <AppTextInput
                  name='phone'
                  label='Phone'
                  type="number"
                />
                <AppTextarea
                  name='address'
                  label='Address'
                />
              </div>

              <div className={actionButtons()}>
                <Button
                  type="button"
                  variant="secondary"
                  className={button()}
                  onPress={router.back}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className={button()}
                >
                  <Save size={15} />
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}

export default function UsersFormPage({ isEdit }: Props) {
  return (
    <RouteGuardProvider pageId="USERS_PAGE" access={isEdit ? "update" : "create"}>
      <UsersFormContent isEdit={isEdit} />
    </RouteGuardProvider>
  );
}
