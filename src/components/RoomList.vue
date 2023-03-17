<script>
    export default {
        props: {
            rooms: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            }
        }
    };
</script>

<template>
    <div class="">
        <hr>
        <div class="nav-room d-flex justify-content-center">
            <ul class="nav">
                <li class="nav-item">
                    <a href="#resort-room" class="nav-link active" aria-current="page">PHÒNG NGHỈ DƯỠNG</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#suit-room">PHÒNG THƯỢNG HẠNG</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#villas-room">BIỆT THỰ</a>
                </li>
            </ul>
        </div>
        <hr>
        <div id="resort-room">
            <h3 class="text-center mb-3">PHÒNG NGHỈ DƯỠNG</h3>
            <p class="text-center mb-4">Nghỉ dưỡng riêng tư trong không gian trong không gian thật tinh khiết gần gũi với thiên nhiên bên người những người thân yêu của bạn.</p>
            <div class="row mt-5">
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-nghi-duong-1.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Phòng Resort Classic Hướng Biển</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Tận hưởng không gian nghỉ dưỡng độc đáo với lối thiết kế là sự kết hợp hoàn hảo giữa văn hóa truyền thống Việt và phong cách đương đại trong căn phòng rộng 72m2 của chúng tôi.</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-nghi-duong-2.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Phòng Resort Classic Toàn Cảnh Biển</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Phòng Resort Classic Toàn Cảnh Biển chào đón bạn đến với khung cảnh núi rừng, khoảng vườn xanh mát và đại dương mênh mông.</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="suit-room">
            <h3 class="text-center mb-3">PHÒNG THƯỢNG HẠNG</h3>
            <p class="text-center mb-4">Resort Classic Suite Hướng Biển</p>
            <div class="row mt-5">
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-thuong-hang-1.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Phòng Resort Classic Hướng Biển</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Nghỉ dưỡng tại phòng Resort Classic thượng hạng rộng 70m2 mang phong cách thiết kế gợi nhiều cảm hứng bởi sự giao thoa tuyệt vời giữa nét văn hóa Việt Nam truyền thống và kiến trúc đương đại.</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-thuong-hang-2.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Club Terrace Suite Toàn Cảnh Biển</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Phòng Club InterContinental mang đến nguồn cảm hứng tuyệt vời và tràn đầy năng lượng bởi không gian rộng rãi của căn góc với ban công lớn hứng trọn ánh sáng trời và những đặc quyền thượng hạng của phòng Club.</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="villas-room">
            <h3 class="text-center mb-3">BIỆT THỰ</h3>
            <p class="text-center mb-4">Nghỉ dưỡng cao cấp cùng bạn bè và gia đình tại một trong những biệt thự đẳng cấp của chúng tôi. Mỗi phòng được thiết kế với phong cách riêng cùng dịch vụ Quản Gia Riêng chuyên nghiệp, tân tâm đáp ứng mọi nhu cầu của bạn trong suốt thời gian lưu trú. Biệt thự sở hữu hồ bơi và khu vực sân hiên riêng biệt là không gian lý tưởng để cùng tận hưởng những khoảnh khắc tuyệt vời bên người bạn yêu thương. Đặc quyền Club InterContinental khiến kỳ nghỉ của bạn càng thêm hoàn hảo.</p>
            <div class="row mt-5">
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-thuong-hang-1.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Penthouse Một Phòng Ngủ Hướng Biển</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Chỉ cách biển vài bước chân, biệt thự một phòng ngủ cạnh biển còn mang đến cho bạn hồ bơi riêng cùng ban công rộng rãi. Các đặc quyền thượng lưu Club InterContinental chắc chắn sẽ khiến cho kỳ nghỉ của bạn trở nên hoàn hảo.</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-thuong-hang-1.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Biệt Thự Một Phòng Ngủ Spa Lagoon</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Nếu bạn đang tìm kiếm sự thanh bình trong một không gian có phong cách thiết kế ấn tượng, Spa Lagoon là lựa chọn cực kỳ hoàn hảo. Biệt thự nằm trong khu đầm phá spa yên tĩnh, gần gũi thiên nhiên, có phòng trị liệu, phòng xông hơi khô – ướt và một bồn sục khoáng jacuzzi ngoài trời!</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-thuong-hang-2.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Biệt Thự Hai Phòng Ngủ trên Ghềnh Đá Cạnh Biển</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Căn biệt thự nhiều tầng với hai phòng ngủ sang trọng, một hồ bơi vô cực, các sân hiên và khu tắm nắng hứa hẹn sẽ là chốn nghỉ dưỡng hoàn hảo trong tiếng sóng xô ghềnh đá.</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-info">
                            <div class="card-avatar">
                                <img src="images/phong-thuong-hang-2.jpg" alt="">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-title">Biệt Thự Hai Phòng Ngủ Hoàng Gia Cạnh Biển</div>
                                </div>
                                <div class="col-8">
                                    <div class="card-subtitle">Bạn sẽ thấy tách biệt hoàn toàn với thế giới bên ngoài khi lưu trú tại căn biệt thự hai tầng có lối thiết kế và trang trí lộng lẫy với phòng ăn nổi trên mặt nước biển, một quầy bar hiện đại cùng không gian giải trí và hồ bơi vô cực dài 13 mét. Tất cả mang lại cho bạn một không gian nghỉ dưỡng riêng tư đẳng cấp thực thụ.</div>
                                    <div class="card-view">
                                        <a href="">Khám phá</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <ul class="list-group mt-5">
        <li
            class="list-group-item"
            v-for="(room, index) in rooms"
            :key="room._id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ room.name }}
        </li>
    </ul>
</template>

<style>
hr {
    background-color: #000;
    height: 1px;
    width: 60%;
}

.nav-room .nav-link {
    color: #000;
}

.nav-room .nav-link.active{
    color: #2e2e2e;
    font-weight: 700;
}

.card {
 width: 600px;
 height: 600px;
 margin: auto;
 background: #f5f5f5;
 transition: box-shadow .3s ease, transform .2s ease;
 cursor: pointer;
}

.card-info {
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 transition: transform .2s ease, opacity .2s ease;
 overflow: hidden;
}

/*Image*/
.card-avatar {
 width: 100%;
 transition: transform .2s ease;
 margin-bottom: 30px;
}


.card-info .card-view {
 width: 70px;
 border-bottom: 3px solid #f4baba;
 margin-top: 10px;
}

.card-view a {
 font-size: 14px;
 color: #595959;
 text-decoration: none;
 font-weight: 500;
}

/*Text*/
.card-title {
 color: #333;
 font-size: 1.5em;
 font-weight: 600;
 line-height: 2rem;
 font-weight: 400;
 padding-left: 16px;
}

.card-subtitle {
 color: #859ba8;
 font-size: 0.8em;
}

/*Hover*/
.card:hover {
 box-shadow: 0 8px 50px #23232333;
}

.card:hover .card-info {
 transform: translateY(-5%);
}

.card-avatar:hover {
 transform: scale(1.1);
}

#resort-room,
#suit-room,
#villas-room {
    margin: 100px 0;
}
</style>