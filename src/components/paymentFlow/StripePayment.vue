<template>
  <div class="formatCompletePage">
<!--        {{"this is the show stripe on second click  ->  " + this.showStripePayment}}-->

<!--{{"here &ndash;&gt; + " + this.secretKey}}-->
    <div class="stripeREcBox">



      <!--repeated flutterwave and payment button and edit button down here  -->

      <div class="formatStripe showStripe" v-show="!this.showStripePayment">

        <div class="stripeREcBox formatterDuplicate">

          <div class="stripeREcBoxHeader">

            <div class="summaryFormat">
              SUMMARY
            </div>

            <div class="totalAmountFormat">
              {{ this.displayCurrency }}
            </div>

          </div>


          <div  class="formatStripeMobile">
            <stripe-element-payment


                ref="paymentRef"
                :pk="pk"
                :elements-options="elementsOptions"
                :confirm-params="confirmParams"
                @loading="loadingState = $event"

            />
          </div>





        </div>

        <div class="formatButtonStripe">


          <a class="nav__link donateButton webVersion btnFormat" @click="pay">
            <img class="submitIconFormat btn" id="pic" :src="payForm">
          </a>


          <a class="editBtn" @click="cancelPay">
            Cancel
          </a>

        </div>


      </div>
    </div>



        <nav class="nav">


          <a
              class="nav__link donateButton mobileVersion"  @click="pay" >
            <img class="submitIconFormatMobile"  :src="continueToForm">
          </a>


        </nav>




  </div>


</template>


<script>

import {StripeElementPayment} from '@vue-stripe/vue-stripe';
import paymetBtn from "@/assets/makePayment.svg";
import continueButoon from "@/assets/makePayment.svg";
// import router from "@/router";


export default {
  name: "StripePayment",
  components: {
    StripeElementPayment
  },
  setup() {
    return {
      payForm: paymetBtn,
      continueToForm: continueButoon,





    };
  },
  data() {


    return {


      pk: process.env.VUE_APP_STRIPE_PUBLIC_KEY,

      elementsOptions: {
        appearance: {
          // theme: 'flat'         ,     // variables: {
          //   colorPrimary: '#f1c609',       // color wen u hover on the element input
          //   colorBackground: '#ffffff',   // <--- works for iput backgrud
          //   colorText: '#464fb7',     // <--- as it shows
          colorDanger: '#df1b1b',  // <--- works for error make
          //   fontFamily: 'Ideal Sans, system-ui, sans-serif',
          //   // spacingUnit: '2px',
          //   // borderRadius: '4px',
          //   // See all possible variables below
          // },


        }
      },
      confirmParams: {

        return_url: window.location.origin + '/paymentsuccess',
        // window.location.href = '/causecontribution/:id/paymentrestart'


      },
      layout: {
        type: 'accordion',
        defaultCollapsed: false,
        radios: true,
        spacedAccordionItems: false
      }

    }
  },

  watch: {

    initStripeDataSecretKey( newValue, oldValue ) {  //  newValue, oldValue

      if (oldValue === null || oldValue === undefined) {

        return window.location.reload();

      }




    }



  }


  ,


  computed: {

    amountEditPage: {

      get() {
        return this.$store.getters.amountDonation
      },

    },

    displayCurrency() {
      const newDonationValue = this.formatNumber(this.amountEditPage)
      return this.$store.getters.currency + ' '+ newDonationValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    continueSTripePayment() {
      return this.$store.getters.continueSTripePayment
    },

    payRef() {
      return this.$store.getters.initStripeData.paymentTransactionReference
    },


    showStripePayment() {


      return this.$store.state.showStripePayment
    },


    showPayoutSummary() {
      return this.$store.getters.showPayoutSummary
      // return false
    },

    initStripeDataSecretKey: function () {
      // return this.$store.state.initStripeData.gatewaySecretKey
      return this.$store.getters.initSecKey
    },

    initStripePublicKey: function () {
      return this.$store.getters.initStripeData.gatewayPublicKey

    },

    stripeDataINfo: function () {
      return this.$store.getters.initStripeData
    },

    showStripeCheckout: {
      get() {
        return this.$store.state.showStripeCheckout
      },
      set(value) {
        this.$store.commit('SET_SHOW_STRIPE_CHECKOUT', value);
      }


    },

    amountDonationInput: {
      get() {


        return this.$store.state.amountDonation.donationValue;
      },
      set(value) {
        this.$store.commit('SET_AMOUNT', value);
      }
    },

    emailInput: {
      get() {
        return "fugazzi@sankore.com"
        // return this.$store.state.email.value;
      },
      set(value) {
        this.$store.commit("SET_EMAIL", value);
      },
    },

    firstName: {


      get() {

        // return this.$store.state.firstName.value
        return "John"
      },
      set(value) {
        this.$store.commit("SET_FIRST_NAME", value);
      }
    },

    lastName: {
      get() {
       return "Doe"
        // return this.$store.state.lastName.value
      },
      set(value) {

        // alert("beep boop")
        this.$store.commit("SET_LAST_NAME", value);
      }
    },


  },
  methods: {

    getSecret() {
      // get data from vuex


    }
    ,


    checkValidAMount() {
      if (this.amountEditPage > 0) {
        alert("Please enter a valid amount")

        return true
      } else {
        alert("Please enter a valid amount")

        return false
      }
    },
    formatNumber(num) {
      return parseFloat(num).toFixed(2)
    },

    async generatePaymentIntent() {

      this.elementsOptions.clientSecret = this.initStripeDataSecretKey

    },


    editPay() {

      this.$store.commit("SET_SHOW_PAYOUT_SUMMARY", false)
      this.$store.commit("SET_SHOW_STRIPE_PAYMENT", false)


      // this.$refs.paymentRef.clear() ;

    },


    cancelPay() {

      console.log("cancel pay clicked")

      this.$store.commit("SET_SHOW_PAYOUT_SUMMARY", false)
      this.$store.commit("SET_SHOW_STRIPE_PAYMENT", false)

      this.$store.commit("SET_FIRST_NAME", null)
      this.$store.commit("SET_LAST_NAME", null)
      this.$store.commit("SET_EMAIL", null)
      this.$store.commit("SET_AMOUNT", null)


      this.$store.commit("SET_CURRENCY", "???");


      // go back one page
      this.$router.go(-1)


      // this.$store.commit("SET_STATUS", true)


      // this.$mount();


    },

    async pay() {


      this.$refs.paymentRef.submit();


    },

  }
  ,
  created() {

    this.generatePaymentIntent()

  },


  mounted() {




    if (this.amountEditPage > 0) {
      return null
    } else {
      this.cancelPay()
    }


  },


}
</script>

<style scoped>

.nav {
  display: none;
}

.subHeading {

  opacity: 0.5;
  color: #010D1C;
  font-family: Inter;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 17px;
}


.shareIcon {
  Width: 20px;
  Height: 20px;
  float: right;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}

.priceDisplay {


  color: #010D1C;
  font-family: Inter;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 33px;
}

.topSection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1.5rem;
  margin-left: 3.3rem;


}

.shareIcon {
  width: 1.1rem;
  height: 1.3rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}


.formatTopView {
  display: flex;
  justify-content: space-between;
}


.topRightSection {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 2.3rem;
  padding-right: 1rem;
}

span.donactedCurrency {
  margin-left: 0.4rem;
  color: #010D1C;
  font-family: Inter;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 33px;
}

span.clientCurrency {
  color: #010D1C;
  font-family: Inter;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 33px;
}

.shareButtonFormat {
  color: #043C83;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 16px;
  padding-top: 0.7rem;
  padding-right: 0.3rem;
}

.textFormatAlignment {
  color: #60C56F;
  font-family: Inter;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 26px;
  padding-top: 2.5rem;
}

img.imageSuccessformat {
  height: 13rem;
  width: 13rem;
}

.formatSuccessLay {
  margin-top: 0rem;
}

.textFormatAlignment {
  color: #60C56F;
  font-family: Inter;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 26px;
  padding-top: 0.5rem;
}

.textFormatBottom {
  color: #010D1C;
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 20px;
  padding-bottom: 0.5rem;
}

.footerTextFOrmat {
  opacity: 0.5;
  color: #010D1C;
  font-family: Inter;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 17px;
  padding-top: 0.4rem;

}

.androidIconFormat {
  width: 8rem;
  height: 2.5rem;
}

.iosIconFormat {
  width: 8rem;
  height: 2.5rem;

}

.formatLogo {

  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 0.5rem;
}




@media screen and (min-width: 1399px) {

  .topRightSection {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    padding-top: 2.3rem;
    padding-right: 2rem;
  }
}


.formatStripe {
  position: relative;
  margin-left: -1.6rem;
  width: auto;
  height: 24.5rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.paymentFormBody {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  /* margin-left: 3.3rem; */
  position: relative;
}


/* Section for details Page */


.grey-box {
  height: 45px;
  width: 307px;
  background-color: #F9F9F9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  cursor: grab;
}

.formatDOnationAMountBox {
  display: flex;
  /* padding-left: 0.8rem; */
  padding-bottom: -0.7em;
  left: 4rem;
  /*position: initial;*/
  padding-top: 0.5rem;
  margin-left: -0.5em;
}

.grey-box__content__title {
  color: rgba(1, 13, 28, 0.8);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.29px;
  line-height: 17px;
  padding-left: 1.1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}


img#pic {
  width: 18.1rem;
}

a.nav__link.donateButton.webVersion.btnFormat {
  /*margin-left: -3.3rem;*/
}

a.editBtn {
  opacity: 0.5;
  color: #010D1C;
  /* font-family: Inter; */
  font-size: 14px;
  letter-spacing: 0;
  /*margin-left: -3rem; */
  /* line-height: 20px; */
  cursor: grab;
  width: 100%;
}

.paymentFormBody.stripeFOmrat {
  padding-top: 2.8rem;
  width: 21rem;
}

/* Stripe format  */


.stripeREcBox {
  height: 25rem;
  width: 18.5rem;
  align-items: center;
  padding-left: 3.4rem;
  display: flex;
  flex-direction: column;
}

.formatButtonStripe {
  padding-left: 1rem;
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summaryFormat {
  opacity: 0.5;
  color: #010D1C;
  font-family: Inter;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 17px;
  padding-bottom: 0.4rem;
}

.totalAmountFormat {
  color: #010D1C;
  font-family: Inter;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 36px;
  margin-top: -0.7rem;
}

.stripeREcBox {
  height: 22rem;
  width: 19.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.stripeREcBoxHeader {
  display: flex;
  width: 100%;
  padding-bottom: 0.5em;
  flex-direction: column;
  align-items: flex-start;

}

.paymentFormBodyHeader.asterix.noAfterAsterix {
  text-align: left;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
  color: #010D1C;
  font-family: Inter;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 17px;
}

.payBtn {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 4rem;
}

a.nav__link.donateButton.webVersion.btnFormat {
  cursor: grab;
   margin-left: -1.1rem;
}

.stripeREcBox.formatterDuplicate {
  padding-left: 1.6rem;
}


@media screen and (max-width: 900px) {

  .formatStripe[data-v-5d5f877e] {
    margin-left: -2.6rem;

  }



  .stripeREcBox{
    height: 25rem;
    width: 21rem;
    align-items: center;
    padding-left: 0.9rem;
    padding-top: 0.1rem;
    display: flex;
    flex-direction: column;
  }

  .formatStripeMobile {
    width: 100%;
  }

  .formatButtonStripe{
    display: none;
  }




  .nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 71px;
    box-shadow: 0 0 3px rgb(0 0 0 / 20%);
    background-color: #ffffff;
    display: flex;
    margin-left: -0.9rem;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    z-index: 100;
    padding: 0 0.9rem;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    /* top: 50%; */
    /* left: 50%; */
    /* transform: translate(-50%,-50%); */
    align-items: center;
    justify-content: center;

  }

  .nav {
    display: flex;
  }

  .formatCompletePage {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }



}

</style>
