<template>
    <aside class="main-sidebar pt-0">
      <section class="sidebar">
        <div class="user-panel">
          <div class="pull-left image">
            <img class="img-responsive" src="/images/female.jpg" alt="#" />
          </div>
          <div class="pull-left info">
            <div class="user_info">
              <h6 v-if="getAdmin">{{ getAdmin.name }}</h6>
              <p><span class="online_animation"></span> Online</p>
            </div>
          </div>
        </div>
  
        <form v-on:submit.prevent class="sidebar-form" id="searchForm">
          <div class="input-group" id="searchContainer">
            <span class="input-group-btn">
              <input type="text"
              name="search"
              id="search"
              class="search form-control"
              laceholder="Search Menus"
              data-list=".sidebar-menu">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
  
        <!-- Sidebar Menu -->
        <sidebar-menu />

      </section>
      <!-- /.sidebar -->
    </aside>
</template>

<script>
    import SidebarMenu from './SidebarMenu.vue';
    import {mapGetters} from 'vuex';
    import { mapActions } from 'vuex'
    export default {
      components: { 
        SidebarMenu 
      },
      computed: {
        ...mapGetters(['getAdmin']),
      }
    };
</script>

<style scope="local">
  .user-panel .image img {
    border-radius: 50%;
  }
  #searchForm {
    padding-left: 0em;
    padding-right: 0em;
  }
  #searchContainer {
    height: 100%;
    padding-bottom: 0em;
  }
  #search {
    width: 70%;
    float: right;
    margin-right: 10px;
    background-color: #def2ff;
  }
  
  #search-btn {
    width: 20%;
  }
</style>
  