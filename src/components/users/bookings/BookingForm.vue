<template>
    <div class="row mb-3 bg-detail-booking">
        <div class="col-6"><p>Ngày nhận phòng: {{ searchLocal.checkin_date }}</p></div>
        <div class="col-6"><p>Giá phòng: {{ formatPrice(roomLocal.price) }}</p></div>
        <div class="col-6"><p>Ngày trả phòng: {{ searchLocal.checkout_date }}</p></div>
        <div class="col-6"><p>Thuế và phí dịch vụ: 250.000</p></div>
        <div class="col-6" v-if="searchLocal.num_of_guests"><p>Số người ở: {{ searchLocal.num_of_guests }}</p></div>
        <div class="col-6" v-else><p>Số người ở: {{ roomLocal.capacity }}</p></div>
        <div class="col-6"> <p class="fw-bold">Tổng giá trị: {{ formatPrice(bookingLocal.total_price) }} VNĐ</p></div>
        <Field    
            hidden id="booking_total_price" :value="((roomLocal.price+25000)/23795).toFixed()"
        />
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
        <p>Thanh toán online</p>
        <div class="w-50 m-auto">
            <div ref="paypal"></div>
        </div>
        <div class="form-group d-flex justify-content-end">
            <button class="me-2 px-4 py-3 btn">
                Đặt phòng
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
        mounted: function() {
            const script = document.createElement("script");
            script.src =
            "https://www.paypal.com/sdk/js?client-id=AT5pO4SLjEoDt65gg6gzPGMAp4Ml1XpOkoeWr7_G-qa3moiSJJFkdqDIBxh1ytFYbCLXHRoT1MsJSur1";
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
        },
        methods: {
            submitBooking() {
                const data = {
                    customer: this.customerLocal,
                    booking: this.bookingLocal
                };
                this.$emit("submitBooking", data);
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            setLoaded: function() {
                var booking_total_price = $("#booking_total_price").val();
                this.loaded = true;
                window.paypal
                    .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                        purchase_units: [
                            {
                            description: "Thanh toán Paypal",
                            amount: {
                                currency_code: "USD",
                                value: booking_total_price
                            }
                            }
                        ]
                        });
                    },

                    style: {
                        size: 'large',
                        color: 'gold',
                        shape: 'pill',
                        tagline : 'false',
                    },

                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        this.bookingLocal.paid = true;
                        this.submitBooking();
                        console.log(order);
                    },
                    onError: err => {
                        console.log(err);
                    }
                    })
                    
                    .render(this.$refs.paypal);
                }
            },
        
        };
</script>

<style scoped>
    input {
        border-radius: 2px !important;
    }

    .bg-detail-booking {
        background-color: #fff;
    }
    .bg-detail-booking p {
        color: #764530;
    }

    button {
        color: #fff;
        background-color: #b38b7a;
    }

    button:hover {
        color: #fff;
        background-color: #8a6b5e;
    }
</style>