import { Button, Row } from 'antd';
import React from 'react';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/features/admin/userManagement.api';
import { TResponse } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
        console.log(data);

        const res = (await changePassword(data)) as TResponse<any>;
        console.log(res);

        if(res?.data?.success){
dispatch(logout());
navigate('/login');
        }else{
            toast.error(res?.error?.data?.message);
        }
    };
    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password:" />
        <PHInput type="text" name="newPassword" label="New Password:" />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
    );
};

export default ChangePassword;