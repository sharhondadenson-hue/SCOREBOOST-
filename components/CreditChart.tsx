
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CreditChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = [
      { month: 'Start', score: 540 },
      { month: 'Month 1', score: 580 },
      { month: 'Month 2', score: 620 },
      { month: 'Month 3', score: 685 },
      { month: 'Month 4', score: 720 },
    ];

    const x = d3.scalePoint()
      .domain(data.map(d => d.month))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([300, 850])
      .range([height, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .style("color", "#64748b");

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .style("color", "#64748b");

    const line = d3.line<any>()
      .x(d => x(d.month)!)
      .y(d => y(d.score))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0284c7")
      .attr("stroke-width", 3)
      .attr("d", line);

    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.month)!)
      .attr("cy", d => y(d.score))
      .attr("r", 5)
      .attr("fill", "#0284c7");

  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6 overflow-hidden">
      <h3 className="text-slate-800 font-semibold mb-4 text-center">Average Client Score Trajectory</h3>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center">Results vary based on individual credit profile.</p>
    </div>
  );
};

export default CreditChart;
