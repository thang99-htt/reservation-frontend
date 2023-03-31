<template>
    <div class="page">
        <h4>Đăng nhập Tài khoản</h4>
        <p class="text-danger" v-if="error"> {{  error }}</p>
        <LoginForm
            :user="user"
            @submit:user="loginUser"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import LoginForm from "@/components/LoginForm.vue";
    import AuthService from "@/services/auth.service";

    export default {
        components: {
            LoginForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                user: {
                    'email': "",
                    'password': "",
                },
                message: "",
                error: "",
            };
        },
        methods: {
            async loginUser(data) {
                try {
                    await AuthService.login(data);
                    this.message = "Đăng nhập tài khoản thành công.";
                } catch (error) {
                    this.error = "Email hoặc mật khẩu không đúng.";
                    console.log(error);
                }
            },
        },
    };
</script>
