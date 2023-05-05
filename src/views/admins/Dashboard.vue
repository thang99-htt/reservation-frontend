<template>
    <div class="container-fluid">
      <div class="row column1 mt-5">
          <div class="col-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-bar-chart blue1_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ formatNumber(revenue) }}</p>
                      <p class="head_couter">Doanh thu</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-book green_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ bookings.length }}</p>
                      <p class="head_couter">Đơn đặt</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-home red_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ rooms.length }}</p>
                      <p class="head_couter">Phòng</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-user yellow_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ customers.length }}</p>
                      <p class="head_couter">Khách hàng</p>
                  </div>
                </div>
            </div>
          </div>
      </div>

      <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
        <div class="mt-5">
          <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" />
        </div>
    </div>
</template>

<script>
    import CustomerService from "@/services/customer.service";
    import RoomService from "@/services/room.service";
    import BookingService from "@/services/booking.service";

    export default {
        data() {
            return {
                customers: [],
                rooms: [],
                bookings: [],
                revenue: 0,
                chartOptions: {
                  chart: {
                    id: 'revenue-chart',
                  },
                  xaxis: {
                    categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                  },
                },
                chartSeries: [{
                  name: 'Doanh thu',
                  data: [],
                }],
            };
        },
        methods: {
            async retrieveStatisticals() {
                try {
                    this.customers = await CustomerService.getAll();
                    this.rooms = await RoomService.getAll();
                    await BookingService.getAll().then((response) => {
                      this.bookings = response;
                      const revenueByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                      response.forEach(index=>{
                        this.revenue = this.revenue + index.total_price;

                        const checkoutMonth = new Date(index.checkout_date).getMonth();
                        revenueByMonth[checkoutMonth] += index.total_price;
                        
                      });
                      for (let i = 0; i < revenueByMonth.length; i++) {
                        this.chartSeries[0].data.push(revenueByMonth[i]);
                      }
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            formatNumber(value) {
              if (!value) return ''
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            
        },
        mounted() {
            this.retrieveStatisticals();
        },
    };
</script>