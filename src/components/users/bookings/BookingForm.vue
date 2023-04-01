<template>
    <div class="row mb-3">
        <div class="col-6"><p>Ngày nhận phòng: {{ searchLocal.checkin_date }}</p></div>
        <div class="col-6"><p>Ngày trả phòng: {{ searchLocal.checkout_date }}</p></div>
        <div class="col-6"><p>Giá phòng: {{ formatPrice(roomLocal.price) }}</p></div>
        <div class="col-6"><p>Thuế và phí dịch vụ: 250.000</p></div>
        <div class="col-6"><p>Số người ở: {{ searchLocal.num_of_guests }}</p></div>
        <div class="col-6"> <p>Tổng giá trị: {{ formatPrice(roomLocal.price + 250000) }} VNĐ</p></div>
    </div>
    <Form
        @submit="submitBooking"
        :validation-schema="customerFormSchema"
    > 
        <div class="form-group">
            <label for="name">Họ tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="customerLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="email"
                type="text"
                class="form-control"
                v-model="customerLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="phone"
                type="text"
                class="form-control"
                v-model="customerLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                class="btn btn-primary"
                @click="reset"
            >
                <i class="fas fa-redo"></i> Hủy
            </button>
        </div>
    </Form>
    
</template>
<script>
    import $ from 'jquery'
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submitBooking"],
        props: {
            search: { type: Object, required: true },
            room: { type: Object, required: true },
            customer: { type: Object, required: true },
            booking: { type: Object, required: true },
        },
        data() {
            const customerFormSchema = yup.object().shape({
                phone: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
                name: yup
                .string()
                .required("Tên phải có giá trị."),
                email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            });
            return {
                customerFormSchema,
                searchLocal: this.search,
                customerLocal: this.customer,
                roomLocal: this.room,
                bookingLocal: this.booking,
            };
        },
        methods: {
            submitBooking() {
                const data = {
                    customer: this.customerLocal,
                    booking: this.bookingLocal
                };
                this.$emit("submitBooking", data);
            },
            // reset () {
            //     this.customerLocal.phone = "";
            //     this.customerLocal.address = "";
            // },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        },
    };
</script>

