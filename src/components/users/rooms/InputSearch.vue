<template>
    <Form
        @submit="submitSearch"
    > 
        <div class="search-room">
            <div class="d-flex flex-xl-row flex-column align-items-start justify-content-start">
                <div class="booking_input_container d-flex flex-lg-row flex-column align-items-start justify-content-start">
                    <div>
                        <label for="">Ngày nhận</label>
                        <input 
                            type="date"
                            class="datepicker booking_input booking_input_a booking_in"
                            v-model="searchLocal.checkin_date">
                    </div>
                    <div>
                        <label for="">Ngày trả</label>
                        <input 
                            type="date"
                            class="datepicker booking_input booking_input_a booking_out" 
                            v-model="searchLocal.checkout_date"
                            >
                        </div>
                    <div>
                        <label for="">Số người</label>
                        <select name="" id="" class="booking_input booking_input_b" v-model="searchLocal.num_of_guests">
                            <option v-for="number in numbers" :value="number">{{ number }}</option>
                        </select>
                    </div>
                    <div>
                        <label for="">Loại phòng</label>
                        <select name="" id="" class="booking_input booking_input_b" v-model="searchLocal.type">
                            <option v-for="typ in types" :value="typ">{{ typ }}</option>
                        </select>
                    </div>
                    <div>
                        <label for="">Tình trạng phòng</label>
                        <select name="" id="" class="booking_input booking_input_b" v-model="searchLocal.status">
                            <option :value=true>Còn chỗ</option>
                            <option :value=false>Hết chỗ</option>
                        </select>
                    </div>
                </div>
                <div><button class="booking_button trans_200 mt-4" @click="submit">Tìm kiếm</button></div>
            </div>
        </div>
    </Form>    
</template>

<script>
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        props: {
            search: { type: String, default: "" },
        },
        emits: ["submitSearch"],
        data() {            
            return {
                numbers: [1, 2, 3, 4],
                types: ['Nghỉ dưỡng', 'Thượng hạng', 'Biệt thự'],
                searchLocal: this.search
            };
        },
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        methods: {
            submitSearch() {
                this.$emit("submitSearch", this.searchLocal);
            },
        },
    };
</script>

<style>
#number-select {
    width: 180px;
    height: 30px;
}

.btn-search .btn {
    padding: 4px 20px;
}

.search-room {
    margin: 0 200px;
}
.search-room .booking_input {
    border: solid 2px #4c4c4c;
    color: #000;
}
.booking_input::-webkit-input-placeholder
{
	font-size: 14px !important;
	font-weight: 500 !important;
	color: #000000 !important;
}
.booking_input:-moz-placeholder
{
	font-size: 14px !important;
	font-weight: 500 !important;
	color: #000000 !important;
}
.booking_input::-moz-placeholder
{
	font-size: 14px !important;
	font-weight: 500 !important;
	color: #000000 !important;
} 
.booking_input:-ms-input-placeholder
{ 
	font-size: 14px !important;
	font-weight: 500 !important;
	color: #000000 !important;
}
.booking_input::input-placeholder
{
	font-size: 14px !important;
	font-weight: 500 !important;
	color: #000000 !important;
}

</style>