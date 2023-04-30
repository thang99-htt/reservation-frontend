<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Họ Tên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Email</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Số điện thoại</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Trạng thái</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(customer, index) in customersList"
            :key="customer"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>
                <button
                    v-if="customer.status == 1"
                    class="btn-booking-status booking-status1"
                    @click="updateStatus(customer)"
                >
                    Hoạt động
                </button>
                <button
                    v-else
                    class="btn-booking-status booking-status2"
                    @click="updateStatus(customer)"
                >
                    Tạm khóa
                </button>                    
            </td>
            <td>
                <button
                    type="button"
                    class="ms-2 btn btn-primary"
                >
                    <i class="fa fa-pen"></i>
                </button>
                <button
                    v-if="customer._id"
                    type="button"
                    class="ms-2 btn btn-danger"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
    import $ from 'jquery'
    import 'datatables.net'
    import 'datatables.net-bs'
    import CustomerService from "@/services/customer.service";

    export default {
        components: {
        },
        props: {
            customers: { type: Array, default: [] },
        },
        data() {
            return {
                customersList: this.customers,
            };
        },
        mounted() {
            this.$nextTick(() => {
                $(".example1").DataTable({
                    "language": {
                        "search": "Tìm kiếm:",
                        "loadingRecords": "Đang tải...",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "lengthMenu": "Hiển thị _MENU_ bản ghi",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                        "paginate": {
                            "first": "Trang đầu",
                            "last": "Trang cuối",
                            "next": "Trang sau",
                            "previous": "Trang trước"
                        }
                    }
                })
            })
        },
        methods: {
            async updateStatus(customer) {
                try {
                    await CustomerService.updateStatus(customer._id).then(async (response) => {
                        // gán lại giá trị cho.customersList
                    this.customersList = await CustomerService.getAll();

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
                        title: 'Trạng thái tài khoản được cập nhật thành công.'
                    })
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
        }
    };
</script>

<style>
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');

    .form-inline {
        display: unset;
    }

    .navbar::before,
    .navbar::after {
        content: unset;
    }

    .btn-booking-status {
        width: 125px;
        height: 30px;
        padding: 0 !important;
        font-size: 15px !important;
        color: #fff;
        border: none;
        border-radius: 4px;
    }

    .booking-status1 {
        background-color: #00b944;
    }

    .booking-status2 {
        background-color: #c60000;
    }

</style>