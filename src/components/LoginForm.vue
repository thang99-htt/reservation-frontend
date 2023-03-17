<template>
    <Form
        @submit="submitLogin"
        :validation-schema="userFormSchema"
    >
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="userLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <Field
                name="password"
                type="password"
                class="form-control"
                v-model="userLocal.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-arrow-right"></i>
                Đăng nhập
            </button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:user", "delete:user"],
        props: {
            user: { type: Object, required: true }
        },
        data() {
            const userFormSchema = yup.object().shape({
                email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
                password: yup
                .string()
                .min(6, "Mật khẩu ít nhất 6 ký tự."),
            });
            return {
                // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
                // userLocal để liên kết với các input trên form
                userLocal: this.user,
                userFormSchema,
            };
        },
        methods: {
            submitLogin() {
                this.$emit("submit:user", this.userLocal);
            },
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>