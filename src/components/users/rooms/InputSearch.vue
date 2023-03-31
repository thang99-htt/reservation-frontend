<script>
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        props: {
            modelValue: { type: String, default: "" },
        },
        emits: ["submit", "update:modelValue"],
        data() {            
            return {
                numbers: [1, 2, 3, 4],
                selectedNumber: 1,
            };
        },
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        methods: {
            updateModelValue(e) {
                this.$emit("update:modelValue", e.target.value);
            },
            submit() {
                this.$emit("submit");
            },
        },
    };
</script>

<template>
    <div class="search-room">
        <div class="d-flex flex-xl-row flex-column align-items-start justify-content-start">
            <div class="booking_input_container d-flex flex-lg-row flex-column align-items-start justify-content-start">
                <div>
                    <input 
                        type="text" onfocus="(this.type='date')" 
                        class="datepicker booking_input booking_input_a booking_in" 
                        placeholder="Ngày nhận"
                        v-model="dateCheckin">
                </div>
                <div>
                    <input 
                        type="text" onfocus="(this.type='date')" 
                        class="datepicker booking_input booking_input_a booking_out" 
                        placeholder="Ngày trả"
                        v-model="dateCheckout"
                        >
                    </div>
                <div>
                    <select name="" id="" class="booking_input booking_input_b">
                        <option disabled selected>Số người</option>
                        <option v-for="number in numbers" :value="number">{{ number }}</option>
                    </select>
                </div>
                <div>
                    <select name="" id="" class="booking_input booking_input_b">
                        <option disabled selected>Phòng</option>
                        <option v-for="number in numbers" :value="number">{{ number }}</option>
                    </select>
                </div>
            </div>
            <div><button class="booking_button trans_200" @click="submit">Tìm kiếm</button></div>
        </div>
    </div>
    
</template>

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