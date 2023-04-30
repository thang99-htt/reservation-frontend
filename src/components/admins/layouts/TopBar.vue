<template>
    <header class="main-header">
        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>

            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <div class="icon_info">
                    <ul>
                        <li><a href="#"><i class="fa fa-bell"></i><span class="badge">2</span></a></li>
                        <li><a href="#"><i class="fa fa-envelope"></i><span class="badge">3</span></a></li>
                        <li><a href="#"><i class="fa fa-question-circle"></i></a></li>
                        
                    </ul>
                    <ul class="user_profile_dd">
                        <li>
                            <a class="dropdown-toggle" data-toggle="dropdown">
                                <img class="img-responsive rounded-circle" src="/images/female.jpg" alt="#" />
                                <span class="name_user" v-if="getAdmin">{{ getAdmin.name }}</span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" @click="logout">
                                    <span>Đăng xuất</span> 
                                    <i class="fa fa-sign-out"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>



<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'TopBar',
        methods: {
            async logout() {
                this.$router.push({ name: "admin.login" });
                localStorage.removeItem('tokenAdmin');
                this.$store.dispatch('logout1');

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
    
                Toast.fire({
                    icon: 'success',
                    title: 'Đăng xuất thành công.'
                })     
            },
        },
        computed: {
            ...mapGetters(['getAdmin'])
        }
    };
</script>