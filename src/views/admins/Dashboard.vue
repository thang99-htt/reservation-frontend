<template>
    <div class="container-fluid">
      <div class="row column1 mt-5">
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-bar-chart blue1_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">3333</p>
                      <p class="head_couter">Tổng doanh thu</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-book green_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">3333</p>
                      <p class="head_couter">Đơn đặt</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-home red_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">3333</p>
                      <p class="head_couter">Phòng</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-user yellow_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">3333</p>
                      <p class="head_couter">Khách hàng</p>
                  </div>
                </div>
            </div>
          </div>
      </div>

      <div class="row column2 graph margin_bottom_30">
          <div class="col-md-l2 col-lg-12">
            <div class="white_shd full">
                <div class="full graph_head">
                  <div class="heading1 margin_0">
                      <h2>Extra Area Chart</h2>
                  </div>
                </div>
                <div class="full graph_revenue">
                  <div class="row">
                      <div class="col-md-12">
                        <div class="content">
                            <div class="area_chart">
                              <canvas height="120" id="canvas"></canvas>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>

        <!-- <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
        <div class="mt-5">
          <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" />
        </div> -->
    </div>
</template>
<style scoped>
    
</style>
