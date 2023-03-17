<template>
    <nav class="navbar navbar-expand navbar-dark bg-white justify-content-between border-bottom">
        <div class="navbar-nav">
            <router-link :to="{ name: 'room' }" class="nav-link text-dark">
                <img src="images/logo.svg" alt="">
            </router-link>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'room' }" class="nav-link text-dark">
                    Phòng
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'gallery' }" class="nav-link text-dark">
                    Thư viện ảnh
                </router-link>
            </li>
        </div>
    </nav>
</template>