import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { message } from "antd";
import { getUserSignInRecordUsingGet } from "@/api/userController";
import "./index.css";
import "dayjs/locale/en"; // Import English locale
dayjs.locale("en");

interface Props {}

/**
 * Helper function to get the ordinal suffix for a given day
 * @param day
 * @returns {string}
 */
const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

/**
 * 刷题日历图
 * @param props
 * @constructor
 */
const CalendarChart = (props: Props) => {
  const {} = props;

  // 签到日期列表（[1, 200]，表示第 1 和第 200 天有签到记录）
  const [dataList, setDataList] = useState<number[]>([]);
  // 当前年份
  const year = new Date().getFullYear();

  // 请求后端获取数据
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInRecordUsingGet({
        year,
      });
      setDataList(res.data);
    } catch (e) {
      message.error("获取刷题签到记录失败，" + e.message);
    }
  };

  // 保证只会调用一次
  useEffect(() => {
    fetchDataList();
  }, []);

  // 计算图表所需的数据
  const optionsData = dataList.map((dayOfYear) => {
    // 计算日期字符串
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    console.log(dateStr);
    return [dateStr, 1];
  });

  // 图表配置
  const options = {
    tooltip: {
      position: "top",
      formatter: (params) => {
        const date = dayjs(params.data[0]);
        const day = date.date();
        const suffix = getOrdinalSuffix(day);
        return `${date.format("MMMM")} ${day}${suffix}`; // e.g., "November 13th"
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 50,
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
      dayLabel: {
        nameMap: ["", "Mon", "", "Wed", "", "Fri", ""], // Show labels only for Mon, Wed, Fri
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className="calendar-chart" option={options} />;
};

export default CalendarChart;
