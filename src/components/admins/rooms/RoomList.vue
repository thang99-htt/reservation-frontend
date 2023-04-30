<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Phòng</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Loại phòng</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Giá</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Sức chứa</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Trạng thái</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(room, index) in roomsList"
            :key="room"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ room.name }}</td>
            <td>{{ room.type }}</td>
            <td>{{ formatPrice(room.price) }}</td>
            <td>{{ room.capacity }}</td>
            <td>
                <button
                    :class="[room.is_available ? 'btn-show' : 'btn-hide']"
                >
                {{ room.is_available ? 'Còn chỗ' : 'Hết chỗ'}}
                </button>                    
            </td>
            <td>
                <button
                    type="button"
                    class="ms-2 btn btn-primary"
                    @click="openModel(room._id)"
                >
                    <i class="fa fa-pen"></i>
                </button>
                <button
                    v-if="room._id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deleteRoom(room._id)"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
    <div v-if="myModel">
        <div class="modal d-block">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateAddressModalLabel">Hiệu chỉnh phòng</h5>
                        <button type="button" class="btn-close"  @click="closeModel"></button>
                    </div>
                    <div class="modal-body">
                        <RoomForm 
                            :room="room"
                            @submit:room="updateRoom"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import 'datatables.net'
    import 'datatables.net-bs'
    import RoomService from "@/services/room.service";
    import RoomForm from "@/components/admins/rooms/RoomForm.vue";

    export default {
        components: {
            RoomForm
        },
        props: {
            rooms: { type: Array, default: [] },
        },
        data() {
            return {
                myModel: false,
                roomsList: this.rooms,
                room: {
                    'name': "",
                    'type': "",
                    'price': "",
                    'capacity': "",
                },
            };
        },
        watch: {
            rooms(newVal) {
                this.roomsList = [...newVal]; // Sao chép mảng mới để tránh thay đổi trực tiếp giá trị của prop
                this.$nextTick(() => {
                    $('.example1').DataTable().destroy();
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
                });
            },
        },
        mounted() {
            this.roomsList = [...this.rooms];
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
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            async openModel(id) {
                await RoomService.get(id).then((response) => {
                    this.room = response;
                });
                this.myModel = true; 
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
                });
            },
            async closeModel() {
                this.myModel = false;
                // gán lại giá trị cho roomsList
                this.roomsList = await RoomService.getAll();
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
                });
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            async updateRoom(data) {
                try {
                    await RoomService.update(data._id, data).then(async(response) => {
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
                        
                        // gán lại giá trị cho roomsList
                        this.roomsList = await RoomService.getAll();

                        // cập nhật lại DataTable
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
                        });
                        
                        Toast.fire({
                            icon: 'success',
                            title: 'Phòng được cập nhật thành công.'
                        })

                        this.myModel = false;
                        
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            deleteRoom(id) {
                Swal.fire({
                    title: 'Bạn có chắc?',
                    text: "Bạn sẽ không thể hoàn tác lại điều này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.value) {
                        RoomService.delete(id).then(()=>{
                            this.roomsList = this.roomsList.filter(room => room._id !== id);
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
                            Swal.fire('Đã xóa thành công!','','success');
                        });
                    }
                })
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

</style>