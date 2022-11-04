import * as React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";
import { Translation } from "react-i18next";
import "./statistic-offers.scss";

// const data = [
//     {
//         name: <Translation>{(t, { i18n }) => <>{t('common.for_sell')}</>}</Translation>,
//         uv: 590,
//         pv: 590,
//         amt: 590,
//         cnt: 590
//     },
//     {
//         name: <Translation>{(t, { i18n }) => <>{t('common.for_rent')}</>}</Translation>,
//         uv: 868,
//         pv: 967,
//         amt: 1506,
//         cnt: 590
//     },
//     {
//         name: <Translation>{(t, { i18n }) => <>{t('common.for_find')}</>}</Translation>,
//         uv: 1397,
//         pv: 1098,
//         amt: 989,
//         cnt: 350
//     }
// ];

export default class StatisticOffers extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [
        {
          name: "Sell",
          uv: this.props.countOffersByUser.countSellOffers,
          pv: this.props.countOffersByUser.countSellOffers,
          amt: Math.max(
            this.props.countOffersByUser.countSellOffers,
            this.props.countOffersByUser.countRentOffers,
            this.props.countOffersByUser.countFindOffers
          ),
          cnt: 590,
        },
        {
          name: "Rent",
          uv: this.props.countOffersByUser.countRentOffers,
          pv: this.props.countOffersByUser.countRentOffers,
          amt: Math.max(
            this.props.countOffersByUser.countSellOffers,
            this.props.countOffersByUser.countRentOffers,
            this.props.countOffersByUser.countFindOffers
          ),
          cnt: 590,
        },
        {
          name: "Find",
          uv: this.props.countOffersByUser.countFindOffers,
          pv: this.props.countOffersByUser.countFindOffers,
          amt: Math.max(
            this.props.countOffersByUser.countSellOffers,
            this.props.countOffersByUser.countRentOffers,
            this.props.countOffersByUser.countFindOffers
          ),
          cnt: 350,
        },
      ],
    };

    console.log("this.state ", this.state);
    console.log("this.props ", this.props.countOffersByUser);
  }

  render() {
    return (
      <div className="area-charts">
        <p>AreaChart of discrete values</p>
        <div className="area-chart-wrapper">
          <div className="area-chart-wrapper-container">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart width={400} height={400} data={this.state.data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area
                  type="monotone"
                  dataKey="amt"
                  fill="#fc3"
                  stroke="#8884d8"
                />
                <Bar dataKey="pv" barSize={40} fill="#94908f" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}
