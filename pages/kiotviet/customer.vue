<template>
  <div>
    <div>
      <b-pagination
        v-model="pageIndex"
        :total-rows="totalCustomer"
        :per-page="pageSize"
        @change="getCustomers"
        pills 
      ></b-pagination>
    </div>
    <div>
      <h4>Tổng khách: {{ totalCustomer }} - Trang: {{ pageIndex }}</h4>
      <b-table
        :items="customers"
        :fields="fields"
        :busy="isBusy"
        striped
        hover
        bordered
      >
        <template v-slot:cell(total)="data">
          <div class="text-right" style="width: 100%">
            {{ $numberWithCommas(data.item.totalInvoiced) }}
          </div>
        </template>
        <template v-slot:cell(lastDate)="data">
          <div>{{ $moment(data.item.modifiedDate).format("DD/MM/YYYY") }}</div>
        </template>
            <template v-slot:cell(action)="data">
                <div>
                    <b-button
                        variant="warning"
                        @click="createCustomer(data.item)"
                    >
                        Sync
                    </b-button>
                </div>
            </template>
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      searchTerm: "",
      searchResults: [],
      pageSize: 50,
      currentItem: 0,
      pageIndex: 0,
      pageTotal: 0,
      customers: [],
      totalCustomer: 0,
      isBusy: false,
      fields: [
        {
          label: "Mã",
          key: "code",
        },
        {
          label: "Tên",
          key: "name",
        },
        {
          label: "Điện thoại",
          key: "contactNumber",
        },
        {
          label: "Doanh thu",
          key: "total",
        },
        {
          label: "Ngày cuối",
          key: "lastDate",
        },
        {
            label: "Hành động",
            key: "action"
        }
      ],
    };
  },
  computed: {
    pages() {
      return Array.from({ length: this.pageTotal }, (_, index) => index);
    },
  },
  methods: {
    createCustomer: async function (customer){
      // this.$createCustomer(customer);
      // console.log(customer);
      // console.log(await this.$getTags({title: "DINH"}));
      // var data = await this.$getCustomerWithCodeKiotViet(customer.code);
      var invoices  = await this.$getAllInvoicesWithCustomerCodeKiotViet(customer.code);
      // console.log("KIOTVIET:", data);
      // console.log("GROUPS", customer.groups.split("|"));
      // var tags = this.$getArrayTag(customer.groups.split("|"), "Customer");
      var customer = await this.$getCustomerWithCode(customer.code);
      if(customer.id == undefined){
        // Chua tao
        customer = await this.$createCustomer(customer);
      }
      var invoice = await this.$createInvoice(invoices[0], customer);
      console.log("INVOICES:", invoice);
    },
    async getCustomers(pageIndex) {
      this.isBusy = true;
      if (pageIndex != undefined) {
        this.currentItem = (pageIndex -1) * this.pageSize;
        this.pageIndex = pageIndex;
      } else {
        this.currentItem = this.pageIndex * this.pageSize;
      }
      var data = await this.$getCustomers(this.pageSize, this.currentItem);
      this.pageTotal = Math.round(data.total / this.pageSize + 1);
      this.customers = data.data;
      this.totalCustomer = data.total;
      this.isBusy = false;
    },
  },
  mounted() {
    this.getCustomers();
  },
};
</script>
