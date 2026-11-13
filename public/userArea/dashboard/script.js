const ctxRadar = document.querySelector("#chartRadar");
const ctxDoughnut = document.querySelector("#chartDoughnut");

const dataRadar = {
  labels: ["Ousado", "Clássico", "Minimalista", "Expressivo"],
  datasets: [
    {
      label: "Perfil",
      data: [80, 77, 72, 60],
      fill: true,
      backgroundColor: "#fb571644",
      borderColor: "#FB5616",
      pointBackgroundColor: "#FB5616",
      pointBorderColor: "#FFFFED",
      pointHoverBackgroundColor: "#FFFFED",
      pointHoverBorderColor: "#FB5616",
    },
  ],
};

new Chart(ctxRadar, {
  type: "radar",
  data: dataRadar,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Intensidade do meu perfil criativo",
        color: "#FB5616",
        font: {
          size: 18,
          weight: "bold",
          family: "poppins",
        },
      },
      subtitle: {
        display: true,
        text: "Pontuação em relação ao máximo possível",
        color: "#FFFFED",
        font: {
          size: 12,
          family: "poppins",
        },
        padding: {
          bottom: 10,
        },
      },
      legend: {
        labels: {
          color: "#FFFFED",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          display: false,
        },
        grid: {
          color: "#3b3b3b",
          lineWidth: 1,
        },
        pointLabels: {
          color: "#FFFFED",
          font: {
            family: "Poppins",
            weight: "bold",
            size: 12,
          },
        },
      },
    },
  },
});

const dataDoughnut = {
  labels: ["Ousado", "Clássico", "Minimalista", "Expressivo"],
  datasets: [
    {
      label: "Participação",
      data: [30, 30, 25, 15],
      backgroundColor: ["#FB5616", "#FB1616", "#edb20f", "#be5600"],
      hoverOffset: 4,
      borderColor: "#00000000",
    },
  ],
};

new Chart(ctxDoughnut, {
  type: "doughnut",
  data: dataDoughnut,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Participação do perfil",
        color: "#FB5616",
        font: {
          size: 18,
          weight: "bold",
          family: "poppins",
        },
      },
      subtitle: {
        display: true,
        text: "Distribuição de pontos entre os perfis",
        color: "#FFFFED",
        font: {
          size: 12,
          family: "poppins",
        },
        padding: {
          bottom: 10,
        },
      },
      legend: {
        labels: {
          color: "#FFFFED",
        },
      },
    },
  },
});
