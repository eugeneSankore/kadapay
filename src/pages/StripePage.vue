<template>
  <div>
    <loading-screen  v-show="loading"></loading-screen>



    <the-header></the-header>


    <div>

      <form class="formFOrmat" >
        <div class="bigCardBoard">
          <error-page v-if="showErrorPage">    </error-page>
          <div class="vertical"></div>
          <div class="pageFormat">
            <div class="addLayoutCard">

              <schoolInfoSection v-if="!showErrorPage" >
                <template v-slot:schoolInfoCauseIMage>
                  <img class="formatCausePicture" :src="causeImage">
                </template>
              </schoolInfoSection>
              <form-info-page  v-if="!showErrorPage"></form-info-page>
            </div>
          </div>

        </div>
<!--        <nav-bar-buttons>-->
<!--        </nav-bar-buttons>-->
      </form>


      <div class='webView'>
        <!--    <div class='cell'>-->
        <div class="ref">

          <error-page v-if="showErrorPage">
          </error-page>



          <!--        <div id="first"    v-if="!showErrorPage">-->
          <div v-if="!showErrorPage" id="first">
            <div class="containLayout">

              <div id="top">
                <schoolInfoSection>
                  <template v-slot:schoolInfoCauseIMage>
                    <img class="formatCausePicture" :src="causeImage">
                  </template>
                </schoolInfoSection>
              </div>
              <div id="dibottom">

                <form-info-page></form-info-page>

              </div>

            </div>

            <schoolInfoSection  id="formatStripeMobile"></schoolInfoSection>


          </div>
          <div id="second"   v-if="!showErrorPage">




            <!--          <router-view v-slot="{ Component }">-->
            <!--            <transition name="fade" mode="out-in">-->
            <!--              <component :is="Component" />-->
            <!--            </transition>-->
            <!--          </router-view>-->

            <!--          <router-view></router-view>-->


            <FormRightHeader>


              <template v-slot:header>
                Payment      </template>

              <template v-slot:subHeader>
                Enter card details to complete payment     </template>

            </FormRightHeader>
            <StripePayment></StripePayment>




<!--            <payment-flow-one></payment-flow-one>-->
          </div>
        </div>

      </div>
    </div>

<!--    <nav class="nav">-->


<!--      <a-->
<!--          class="nav__link donateButton mobileVersion"  @click="pay" >-->
<!--        <img class="submitIconFormatMobile"  :src="continueToForm">-->
<!--      </a>-->


<!--    </nav>-->

    <the-footer></the-footer>

  </div>
</template>
<script>
import LoadingScreen from "@/components/layout/LoadingScreen.vue";

import TheFooter from "@/components/layout/TheFooter";
import TheHeader from "@/components/layout/TheHeader";

import causeImage from "@/assets/projectIMage.png";
//
// import NavBarButtons from "@/components/layout/NavBarButtons";
import FormInfoPage from "@/pages/FormInfoPage";
import SchoolInfoSection from "@/pages/SchoolInfoSection";
import ErrorPage from "@/pages/ErrorPage.vue";


import FormRightHeader from "@/components/layout/FormRightHeader";
import StripePayment from "@/components/paymentFlow/StripePayment.vue";
import {mapGetters} from "vuex";
import continueButoon from "@/assets/makePayment.svg";
// import SchoolInfoSection from "@/pages/SchoolInfoSection.vue";

export default {
  name: "StripePage",
  components: {
    LoadingScreen,

    StripePayment,
    SchoolInfoSection,
    // PaymentSuccess
    FormRightHeader,
    FormInfoPage,
    TheHeader,
    TheFooter,
    ErrorPage
  },
  data() {
    return {
      continueToForm: continueButoon,
      causeImg: causeImage,
      causeData : null,
      idCause: null,
      sudoExample: null,
      // showErrorPage : false,
    };
  },
  computed: {

    causeImage() {

      const val = this.$store.state.causeXData

      if (val.responseContent.avatar === null || val.responseContent.avatar === undefined
          || val.responseContent.avatar === "") {
        return this.causeImg
      }

      return val.responseContent.avatar
    },

    ...mapGetters({
      showErrorPage: "errorPage",

    }),
    loading() {
      return this.$store.state.loadingStatus;
    },

    payRef() {
      return this.$store.getters.initStripeData.paymentTransactionReference
    },

  },
methods: {

  // pay() {
  //   this.$refs.paymentRef.submit();
  // }




},
  beforeMount() {


  },
  created() {

    // if(this.$store.state.initStripeData.gatewaySecretKey !== null) {
    // alert("stripe key is not null")
    // } else {
    //
    //   alert("stripe key is null")
    //   this.$router.go(0)
    //
    // }

    console.log("%c we in here ", "color: pink; font-size: 5" +
        "0px", this.loadingStatus);
    console.log("%c we in here ", "color: pink; font-size: 5px", this.$store.state.loadingStatus);
    //
  },
  afterMount() {
    console.log("%c we in here ", "color: black; font-size: 20" +
        "0px", this.loadingStatus);
    console.log("%c we in here ", "color: black; font-size: 2px", this.$store.state.loadingStatus);
  },
};

</script>

<style scoped>


#formatStripeMobile
{
  display: none;
}

.webView{
  display: none;
}


.nav {
  display: none;
}

.formatStatsView {
  margin-top: 0.5rem;
}


.loading {
  position: fixed;
  z-index: 9999;
  height: 100%;
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

}


.container .schoolDetails {
  display: flex;
  padding-top: 2rem;
  height: 5rem;
  margin-left: 2.5rem;
}

.schoolDetails .left {
  width: 20%;
}

.schoolDetails .right {
  width: 80%;
  margin-left: -0.9rem;
}

.schoolDetails .left .schoolLogo {
  width: 70%;
  height: 90%;
}

.right .schoolNameFormat {
  font-weight: 600;
  color: #0E223D;
  color: #0E223D;
  font-family: "SF Pro Text";
  font-size: 16px;
  width: 14rem;
  /* font-weight: 500; */
  letter-spacing: -0.33px;
  line-height: 17px;
  margin-top: 0.3rem;
}

.right .schoolLocationFormat {
  color: #9E9E9E;
  /*font-family: Inter;*/
  font-size: 12px;
  letter-spacing: 0;
  line-height: 14px;
  padding-top: 0.1rem;
}

.causeDetails {
  padding-top: 0.6rem;
  margin-left: 2.7rem;
}

.causeContentTitleFormat {

  /*font-weight: 500;*/
  width: 14rem;
  color: #041427;
  font-family: "SF Pro Text";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.39px;
  line-height: 17px;
}

span.contributedAmountTextDescPercentAfter {
  color: #8F959B;
  /*font-family: Inter;*/
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
  padding-left: 0.3rem;
}

span.TileHolderText {
  opacity: 0.4;
  color: #041427;
  font-family: "SF Pro Text";
  font-size: 12px;
  letter-spacing: 0;
  line-height: 11px;
}

span.causeContentCreatorFormat {
  width: 107px;
  color: #003B88;
  font-family: "SF Pro Text";
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 12px;
  margin-left: 0.1rem;
}

section.contributionGauge {
  color: #041427;
  font-family: "SF Pro Text";
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
  padding-top: 1rem;
  width: 20.44rem;
  margin-left: 2.6rem;

}


span.contributedAmount {
  color: #000000;
  /*font-family: Inter;*/
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
  font-weight: 600;
  margin-left: 0.1rem;
}

span.contributedAmountTextDesc {
  color: #8F959B;
  /*font-family: Inter;*/
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
  padding-left: 0.1rem;

}

span.totalAmountContributed {

  width: 101px;
  opacity: 0.87;
  color: #010D1C;
  /*font-family: Inter;*/
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 19px;
  text-align: right;
  float: right;
}


span.dateCloseContribution {
  width: 68px;
  text-align: right;
  /* float: right; */
  color: #010D1C;
  font-family: "SF Pro Text";
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  padding-right: 0.3rem;
  line-height: 17px;
  margin-left: 0.3rem;


}

span.dateCloseText {
  width: 101px;
  text-align: right;
  /*float: right;*/

  color: #8F959B;
  font-family: "SF Pro Text";
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 17px;
  /*margin-left: 0.3rem;*/

}


div.formatTopGUage {
  width: 14rem;
}

span.formatDayText {
  width: 68px;

  text-align: right;
  /* float: right; */
  color: #010D1C;
  font-family: "SF Pro Text";
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  padding-right: 0.3rem;
  line-height: 17px;
  margin-left: 0.3rem;
}


.np-progress-container {
  width: 100%;
  height: 10px;
  border-radius: 6px;
  background-color: #E8EAED;
  position: relative;
  margin-top: 0.5rem;
}


.np-progress-loader {
  border-radius: 6px;
  background-color: #60C56F;
  /*background: linear-gradient(0deg, #251db0 0%, #227cb8 50%, #00d4ff 100%);*/
  height: 10px;
  width: 0%;
  max-width: 100%;
  min-width: 0%;
  overflow: hidden;
}

.centerIMage {
  margin-left: 2.7rem;
  width: 18.21rem;
  max-width: 22rem;
}

.formatCausePicture {
  width: 20.8rem;
  height: 8rem;
  border-radius: 0.3rem;
  margin-top: 0.3rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(128, 140, 140, 0.96);

}

.pullToRight {
  /*margin-top: 0.5rem;*/
  text-align: right;
  float: right;
}

.CauseMainDescription {
  color: #041427;
  font-family: "SF Pro Text";
  font-size: 11px;
  letter-spacing: 0;
  padding-top: 1.4rem;
  line-height: 15px;
  width: 21.21rem;
  /* max-width: 31rem; */
  margin-left: 2.6rem;
}

.formatNameOfDOnors {
  color: #010D1C;
  /*font-family: Inter;*/
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 13px;
  padding-top: 1rem;
  margin-left: 2.6rem;
  width: 21.21rem;
  /* max-width: 31rem; */
  margin-left: 2.6rem;
}

.formatDonorImage {
  width: 88%;
  height: 88%;
  padding-top: 0.6rem;
  padding-bottom: 3.5rem;
}


.pageFormat {
  width: 100%;
  height: 100%;
  /* background-color: #F8F8F8; */
  /* padding-top: 1rem; */
  padding-bottom: 1rem;
  padding-top: 0.5rem;

}


@media screen and (max-width: 350px) {

  .formatCausePicture[data-v-32679b52] {
    width: 18rem;

  }

}
@media screen and (max-width: 900px) {
  .formFOrmat {
    display: none;
  }
  .webView{
    display: block;
  }

  .containLayout{
    display: none;
  }

  #formatStripeMobile
  {
    padding-top: 5rem;
    display: block;
  }

  div#second {
    display: flex;
    flex-direction: column;
    align-items: center;
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




}

@media screen and (min-width: 899px) {
  .formFOrmat {
    display: none;
  }


  nav-bar-buttons {
    background-color: #ff0000;
  }

  .pageFormat[data-v-32679b52] {
    /* width: 100%; */
    height: 46rem;
    background-color: #e8eaed;
    padding-top: -5rem;
    padding-bottom: -39rem;
    /* padding-top: 0.5rem; */
    border-radius: 5px 5px 5px 5px;
    border-radius: 10px 0 0 10px;
    background-color: #371c1c;
    position: relative;
    z-index: 1;
    box-shadow: 5px 0 76px 0 rgb(0 0 0 / 15%);
  }

  .vertical {
    /* box-sizing: border-box; */
    margin-top: 6rem;
    /* height: 4px; */
    position: absolute;
    width: 100%;
    /* z-index: 1; */
    border: 1px solid #DEDEDE;
  }



  .addLayoutCard {
    width: 100%;

    display: flex;
    gap: 16px;

    justify-content: center;
    align-items: center;
  }


  /*
  Layout for the card
   */

  .webView {
    /* width: 100%; */
    background-image: url(/src/assets/opacifyBG.svg);
    display: table;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    background-color: #F8F8F8;
    width: 100%;
    width: 100%;
    height: 65vh;
    margin: 0;
    padding: 0;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding-top: 3em;
    padding-bottom: 5rem;
  }

  .cell{
    background-color: red;
    display:table-cell;
    vertical-align:middle;
  }

  .ref{
    display: inline-block;
    /* border: 8px solid black; */
    width: 52rem;
    height: 36.5rem;
    border-radius: 5px 5px 5px 5px;
    background-color: #ffffff;
    /* border-radius: 0px 10px 10px 0; */
    box-shadow: 0px 0 10px 1px rgb(0 0 0 / 3%);
  }

  #first {
    width: 46.6%;
    height: 100%;
    /* background-color: #e53535; */
    border-radius: 0.5rem 0 0 0.5rem;
    float: left;
    border-radius: 10px 0 0 10px;
    box-shadow: 3px 0px 20px 0px rgb(4 9 8 / 5%);
    z-index: 1;
  }
  #second {
    width: 53.4%;
    height: 100%;
    /* background-color: #d13e3e; */
    /* border-radius: 0 0.5rem 0.5rem 0; */
    float: right;
    z-index: 1;
    border-radius: 0px 10px 10px 0;
  }

  .containLayout{
    height: 100%;
    /*background-color: black;*/
    width: 100%;
    position: relative;
    border-radius: 0 10px 0 10px;
  }

  #top, #dibottom {
    position: absolute;
    margin-bottom: 2.5rem;
  }
  #top {
    top: 0;
    /*background-color: red;*/
    height: 50%;
    /*border: 1px solid #999;*/
    width: 100%;
    height: 70%;

    border-radius: 10px 0 0 0;
  }
  #dibottom {
    bottom:0;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: 0.3s ease-out;
  }
  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(300px);
  }
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: 0.3s ease-out;
  }
  .grow-in-enter-from,
  .grow-in-leave-to {
    opacity: 0;
    transform: scale(0.3);
  }
  .grow-in-enter-active,
  .grow-in-leave-active {
    transition: 0.3s ease-out;
  }
  .grow-out-enter-from,
  .grow-out-leave-to {
    opacity: 0;
    transform: scale(1.5);
  }
  .grow-out-enter-active,
  .grow-out-leave-active {
    transition: 0.3s ease-out;
  }




}

@media screen and (min-width: 1399px) {
  .ref {
    display: inline-block;
    /* border: 8px solid black; */
    width: 69rem;
    height: 36.5rem;
    border-radius: 5px 5px 5px 5px;
    background-color: #ffffff;
    /* border-radius: 0px 10px 10px 0; */
    box-shadow: 0px 0 10px 1px rgb(0 0 0 / 3%);
  }

  #first {
    width: 35.6%;
    height: 100%;
    /* background-color: #e53535; */
    border-radius: 0.5rem 0 0 0.5rem;
    float: left;
    border-radius: 10px 0 0 10px;
    box-shadow: 3px 0px 20px 0px rgb(4 9 8 / 5%);
    z-index: 1;
  }
  #second {
    width: 64.4%;
    height: 100%;
    /* background-color: #d13e3e; */
    /* border-radius: 0 0.5rem 0.5rem 0; */
    float: right;
    z-index: 1;
    border-radius: 0px 10px 10px 0;
  }

  .headerFormatForm {
    border-bottom: 1.5px solid #E5E5E5;
    /*width: 87%;*/
    height: 5.5rem;
    display: flex;
    padding-left: 3.4rem;
    align-items: self-start;
    flex-direction: column;
  }




  .ref{
    display: inline-block;
    /* border: 8px solid black; */
    width: 69rem;
    height: 36.5rem;
    border-radius: 5px 5px 5px 5px;
    background-color: #ffffff;
    /* border-radius: 0px 10px 10px 0; */
    box-shadow: 0px 0 10px 1px rgb(0 0 0 / 3%);
  }

  #first{
    width: 35.6%;
    height: 100%;
    /* background-color: #e53535; */
    border-radius: 0.5rem 0 0 0.5rem;
    float: left;
    border-radius: 10px 0 0 10px;
    box-shadow: 3px 0px 20px 0px rgb(4 9 8 / 5%);
    z-index: 1;
  }
  #second{
    width: 64.4%;
    height: 100%;
    /* background-color: #d13e3e; */
    /* border-radius: 0 0.5rem 0.5rem 0; */
    float: right;
    z-index: 1;
    border-radius: 0px 10px 10px 0;
  }

  .headerFormatForm {
    border-bottom: 1.5px solid #E5E5E5;
    /*width: 87%;*/
    height: 5.5rem;
    display: flex;
    padding-left: 3.4rem;
    align-items: self-start;
    flex-direction: column;
  }



}






form-info-page{
  display: none;
}

</style>
