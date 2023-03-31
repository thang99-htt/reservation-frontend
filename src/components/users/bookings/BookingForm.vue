<template>{{ customerLocal }}
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
        emits: ["submit:booking"],
        props: {
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
                customerLocal: this.customer,
                roomLocal: this.room,
                bookingLocal: this.booking,
            };
        },
        methods: {
            submitBooking() {
                this.$emit("submit:booking", this.bookingLocal);
            },
            // reset () {
            //     this.customerLocal.phone = "";
            //     this.customerLocal.address = "";
            // },
        },
    };
</script>

