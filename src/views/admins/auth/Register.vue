<template>
    <div class="page">
        <h4>Đăng ký Tài khoản</h4>
        <p class="text-danger" v-if="error" > {{  error }}</p>
        <RegisterForm
            :user="user"
            @submit:user="registerUser"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import RegisterForm from "@/components/RegisterForm.vue";
    import AuthService from "@/services/auth.service";

    export default {
        components: {
            RegisterForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                user: {
                    'name': "",
                    'email': "",
                    'password': "",
                },
                message: "",
                error: '',
            };
        },
        methods: {
            async registerUser(data) {
                try {
                    await AuthService.register(data);
                    this.message = "Đăng ký tài khoản thành công.";
                } catch (error) {
                    this.error = "Tài khoản đã tồn tại";
                    console.log(error);
                }
            },
        },
    };
</script>
