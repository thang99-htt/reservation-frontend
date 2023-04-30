<template>
    <header class="header">
		<div class="header_content d-flex flex-row align-items-center justify-content-center">
			<div><a href="/"><img src="http://127.0.0.1:3001/images/logo.svg" alt=""></a></div>
			<div class="d-flex flex-row align-items-center justify-content-start">
				<nav class="main_nav">
					<ul class="d-flex flex-row align-items-start justify-content-start">
						<li class="navLink active">
							<router-link to="/">Trang chủ</router-link>
						</li>
						<li class="navLink">
							<router-link to="/rooms">Phòng</router-link>
						</li>
						<li class="navLink">
							<router-link to="/">Về chúng tôi</router-link>
						</li>
						<li class="navLink">
							<router-link to="/">Liên hệ</router-link>
						</li>
					</ul>
				</nav>
				<div class="book_button" v-if="getUser">
					<a href="/bookings">Theo dõi đơn đặt</a>
				</div>
				<div class="header_phone d-flex flex-row align-items-center justify-content-center">
					<img src="images/phone.png" alt="">
					<span>0183-12345678</span>
				</div>
				<div class="book_button" v-if="getUser">
					<a href="" @click="logout">Đăng xuất</a>
				</div>
				<div class="book_button" v-else>
					<router-link to="/login">Đăng nhập</router-link>
				</div>
				<div class="hamburger"><i class="fa fa-bars" aria-hidden="true"></i></div>
			</div>
		</div>
	</header>
</template>

<script>
	import $ from 'jquery'
    import {mapGetters} from 'vuex';

	export default {
		mounted() {
			$(".navLink").on("click", function() {
				$(".navLink").removeClass("active");
				$(this).addClass("active");
      		});
    	},
		methods: {
            async logout() {
                this.$router.push({ name: "home" });
                localStorage.removeItem('tokenUser');
                this.$store.dispatch('logout');

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
            ...mapGetters(['getUser'])
        }
	}
</script>