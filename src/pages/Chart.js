import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import moment from "moment";
import { call } from "../service/ApiService";

const Chart = ({ displayedMonth }) => {
  const [data, setData] = useState([]);
  const [year, month] = displayedMonth.split("-");

  useEffect(() => {
    call(`/diary/diaries`, "GET", null)
      .then((response) => {
        if (response) {
          const emotionData = response.map((e) => {
            return {
              emotion: e.emotion,
              date: new Date(e.createdAt),
            };
          });
          setData(emotionData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculatePercentages = (filteredData) => {
    const emotionsCount = filteredData.reduce(
      (acc, entry) => ({
        ...acc,
        [entry.emotion]: (acc[entry.emotion] || 0) + 1,
      }),
      {}
    );

    const totalDataCount = filteredData.length;

    const percentages = {
      angry: emotionsCount["ANGRY"]
        ? (emotionsCount["ANGRY"] / totalDataCount) * 100
        : 0,
      sad: emotionsCount["SAD"]
        ? (emotionsCount["SAD"] / totalDataCount) * 100
        : 0,
      happy: emotionsCount["HAPPY"]
        ? (emotionsCount["HAPPY"] / totalDataCount) * 100
        : 0,
      soso: emotionsCount["SOSO"]
        ? (emotionsCount["SOSO"] / totalDataCount) * 100
        : 0,
    };

    return percentages;
  };

  const getCurrentMonthData = () => {
    return data.filter(
      (entry) => moment(entry.date).format("YYYY-MM") === displayedMonth
    );
  };

  const percentages = calculatePercentages(getCurrentMonthData());

  const COLORS = {
    ANGRY: "#E34234",
    SAD: "#6495ED",
    HAPPY: "#FFBB28",
    SOSO: "#3CB371",
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={20}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  const numdata = [
    { name: "ANGRY", value: percentages.angry },
    { name: "SAD", value: percentages.sad },
    { name: "HAPPY", value: percentages.happy },
    { name: "SOSO", value: percentages.soso },
  ].filter((entry) => entry.value > 0);

  return (
    <div className="CalenChart">
      <h1>📅 캘린더</h1>
      <hr />
      <h3>
        {year} 년 {month} 월의 통계
      </h3>
      <div className="col-md-8">
        <ResponsiveContainer width={600} height={600} className="text-center">
          {percentages.angry === 0 &&
          percentages.sad === 0 &&
          percentages.happy === 0 &&
          percentages.soso === 0 ? (
            <div>이번 달은 작성하신 일기가 없어요!</div>
          ) : (
            <PieChart>
              <Legend layout="vertical" verticalAlign="middle" align="right" />
              <Pie
                data={numdata}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
              >
                {numdata.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
