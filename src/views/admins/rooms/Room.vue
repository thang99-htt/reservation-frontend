<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách phòng</h3>
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
                                @click="removeAllRooms"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <RoomList
                        v-if="filteredRoomsCount > 0"
                        :rooms="filteredRooms"
                    />
                    <p v-else>Không có phòng nào.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="myModel">
        <div class="modal d-block">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateAddressModalLabel">Thêm phòng mới</h5>
                        <button type="button" class="btn-close"  @click="closeModel"></button>
                    </div>
                    <div class="modal-body">
                        <RoomForm 
                            :room="room"
                            @submit:room="createRoom"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RoomList from "@/components/admins/rooms/RoomList.vue";
    import RoomForm from "@/components/admins/rooms/RoomForm.vue";
    import RoomService from "@/services/room.service";

    export default {
        components: {
            RoomList,
            RoomForm
        },
        name: 'admin.room',
        // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
        data() {
            return {
                myModel: false,
                rooms: [],
                room: {
                    'name': "",
                    'type': "",
                    'price': "",
                    'capacity': "",
                },
            };
        },
        computed: {
            filteredRooms() {
                return this.rooms;
            },
            filteredRoomsCount() {
                return this.filteredRooms.length;
            },
        },
        methods: {
            openModel() {
                this.myModel = true;
            },
            closeModel() {
                this.myModel = false;
            },
            async retrieveRooms() {
                try {
                    this.rooms = await RoomService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveRooms();
            },
            async createRoom(data) {
                try {
                    await RoomService.create( data).then((response) => {
                        // console.log(response);
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
                            title: 'Phòng được thêm thành công.'
                        })

                        this.refreshList();

                        this.rooms.push(response); // Sao chép mảng mới để tránh thay đổi trực tiếp giá trị của prop

                        // Cập nhật lại prop `rooms`
                        this.$emit('update:rooms', this.rooms);
                        
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            async removeAllRooms() {
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await RoomService.deleteAll();
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
