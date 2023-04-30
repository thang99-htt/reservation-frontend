<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách khách hàng</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4 ms-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn btn-primary me-3" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn btn-success me-3"  @click="openModel">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="btn btn-danger"
                                @click="removeAllCustomers"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <CustomerList
                        v-if="filteredCustomersCount > 0"
                        :customers="filteredCustomers"
                    />
                    <p v-else>Không có phòng nào.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import CustomerList from "@/components/admins/customers/CustomerList.vue";
    import CustomerService from "@/services/customer.service";

    export default {
        components: {
            CustomerList,
        },
        name: 'admin.customer',
        // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
        data() {
            return {
                customers: [],
            };
        },
        computed: {
            filteredCustomers() {
                return this.customers;
            },
            filteredCustomersCount() {
                return this.filteredCustomers.length;
            },
        },
        methods: {
            async retrieveCustomers() {
                try {
                    this.customers = await CustomerService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveCustomers();
            },
            async removeAllCustomers() {
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await CustomerService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            
        },
        mounted() {
            this.refreshList();
        },
    };
</script>

<style scoped>
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>
