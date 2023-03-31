<template>
  <ul class="sidebar-menu">
    <li class="header">CÔNG CỤ</li>
    <li class="pageLink active">
      <router-link to="/admin/dashboard">
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/rooms">
        <i class="fa fa-th-large"></i>
        <span class="page">Phòng</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/bookings">
        <i class="fa fa-book"></i>
        <span class="page">Đơn đặt</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/products">
        <i class="fa fa-user"></i>
        <span class="page">Khách hàng</span>
      </router-link>
    </li>
    <li class="header">CÁ NHÂN</li>
    <li class="pageLink">
      <router-link to="/admin/setting">
        <i class="fa fa-cog"></i>
        <span class="page">Cài đặt</span>
      </router-link>
    </li>
    <li class="header">TRANG</li>
    <li class="pageLink">
      <router-link to="/login">
        <i class="fa fa-circle text-yellow"></i>
        <span class="page">Đăng xuất</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/404">
        <i class="fa fa-circle text-red"></i>
        <span class="page"> 404</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import $ from 'jquery'
  export default {
    mounted() {
          $(".pageLink").on("click", function() {
          $(".pageLink").removeClass("active");
          $(this).addClass("active");
      });
    }
  }
</script>

<style>
  /* override default */
  .sidebar-menu > li > a {
    padding: 12px 15px 12px 15px;
    color: #fff;
  }

  .sidebar-menu li.active > a > .fa-angle-left,
  .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }

  .treeview-title {
    z-index: 1;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
