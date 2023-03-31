<template>
    <header class="header">
		<div class="header_content d-flex flex-row align-items-center justify-content-between">
			<div><a href="/"><img src="http://127.0.0.1:3001/images/logo.svg" alt=""></a></div>
			<div class="ml-auto d-flex flex-row align-items-center justify-content-start">
				<nav class="main_nav">
					<ul class="d-flex flex-row align-items-start justify-content-start">
						<li class="navLink active">
							<router-link to="/">Trang chủ</router-link>
						</li>
						<li class="navLink">
							<router-link to="/rooms">Phòng</router-link>
						</li>
						<li class="navLink">
							<router-link to="/">Blog</router-link>
						</li>
						<li class="navLink">
							<router-link to="/">Về chúng tôi</router-link>
						</li>
						<li class="navLink">
							<router-link to="/">Liên hệ</router-link>
						</li>
					</ul>
				</nav>
				<div class="book_button"><a href="booking.html">Book Online</a></div>
				<div class="header_phone d-flex flex-row align-items-center justify-content-center">
					<img src="images/phone.png" alt="">
					<span>0183-12345678</span>
				</div>

				<!-- Hamburger Menu -->
				<div class="hamburger"><i class="fa fa-bars" aria-hidden="true"></i></div>
			</div>
		</div>
	</header>
</template>

<script>
	import $ from 'jquery'
	export default {
		mounted() {
			$(".navLink").on("click", function() {
				$(".navLink").removeClass("active");
				$(this).addClass("active");
      	}	);
    	}
	}
</script>