import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useState, useEffect } from "react";
import { call } from "../service/ApiService";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    call(`/diary/diaries`, "GET", null)
      .then((response) => {
        const emotionData = response.map((e) => {
          return {
            emotion: e.emotion, // 이모지 데이터가 어떤 프로퍼티에 저장되어 있는지에 따라 변경
            date: new Date(e.createdAt),
          };
        });
        setData(emotionData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculatePercentages = (filteredData) => {
    // 데이터에서 각 emotion의 개수를 계산
    const emotionsCount = filteredData.reduce(
      (acc, entry) => ({
        ...acc,
        [entry.emotion]: (acc[entry.emotion] || 0) + 1,
      }),
      {}
    );

    // 총 데이터 개수 계산
    const totalDataCount = filteredData.length;

    // 각 emotion의 비율 계산
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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    return data.filter(
      (entry) =>
        entry.date.getFullYear() === currentYear &&
        entry.date.getMonth() === currentMonth
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
        fontSize={14}
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
    <div>
      <div>
        <h1>📅 캘린더</h1>
        <hr />
        <h3>내 감정 통계</h3>
        <div className="col-md-8">
          <ResponsiveContainer width={400} height={200} className="text-center">
            <PieChart>
              <Legend layout="vertical" verticalAlign="middle" align="right" />
              <Pie
                data={numdata}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {numdata.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;
