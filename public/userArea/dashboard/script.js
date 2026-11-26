const ctxRadar = document.querySelector("#chartRadar");
const ctxDoughnut = document.querySelector("#chartDoughnut");

async function dataDashboard() {
  const userId = sessionStorage.getItem("ID_USER");
  const profilePrimary = document.querySelector("#kpiProfilePrimary");
  const profileSecondary = document.querySelector("#kpiProfileSecondary");
  const qtdAttempt = document.querySelector("#kpiQtdAttempt");

  const res = await fetch(`/dashboard/user/${userId}`);
  const data = await res.json();

  profilePrimary.innerHTML = `${data[0].profile_name}`;
  profileSecondary.innerHTML = `${data[1].profile_name}`;
  qtdAttempt.innerHTML = `${data[0].qtd_attempt}`;
}
dataDashboard();

async function showChartRadar() {
  const userId = sessionStorage.getItem("ID_USER");
  const profilePrimaryPercent = document.querySelector("#kpiPrimaryPorcent");
  const profileSecondaryPercent = document.querySelector(
    "#kpiSecondaryPorcent",
  );

  const res = await fetch(`/dashboard/chart-radar/user/${userId}`);
  const data = await res.json();

  const dataRadar = {
    labels: [],
    scores: [],
  };

  for (let i = 0; i < data.length; i++) {
    dataRadar.labels[i] = data[i].profile_name;
    const maxScore = data[i].max_score;
    const score = data[i].score_total;
    dataRadar.scores[i] = (score / (maxScore * 8)) * 100;
  }

  profilePrimaryPercent.innerHTML = `${dataRadar.scores[0].toFixed(1)}%`;
  profileSecondaryPercent.innerHTML = `${dataRadar.scores[1].toFixed(1)}%`;

  const dataChartRadar = {
    labels: dataRadar.labels,
    datasets: [
      {
        label: "Perfil",
        data: dataRadar.scores,
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
    data: dataChartRadar,
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
}
showChartRadar();

async function showCharDoughnut() {
  const userId = sessionStorage.getItem("ID_USER");
  const profileParticipation = document.querySelector("#profileParticipation");

  const res = await fetch(`/dashboard/chart-doughnut/user/${userId}`);
  const data = await res.json();

  const dataDoughnut = {
    labels: [],
    scores: [],
  };

  let scoreTotal = 0;
  for (let i = 0; i < data.length; i++) {
    dataDoughnut.labels[i] = data[i].profile_name;
    dataDoughnut.scores[i] = data[i].score_total;
    scoreTotal += Number(data[i].score_total);
  }

  for (let i = 0; i < data.length; i++) {
    const score = data[i].score_total;
    dataDoughnut.scores[i] = ((score / scoreTotal) * 100).toFixed(1);
  }

  if (dataDoughnut.scores[0] !== undefined) {
    profileParticipation.textContent = `${dataDoughnut.scores[0]}%`;
  }

  const dataChartDoughnut = {
    labels: dataDoughnut.labels,
    datasets: [
      {
        label: "Participação",
        data: dataDoughnut.scores,
        backgroundColor: ["#FB5616", "#FB1616", "#edb20f", "#be5600"],
        hoverOffset: 4,
        borderColor: "#00000000",
      },
    ],
  };

  new Chart(ctxDoughnut, {
    type: "doughnut",
    data: dataChartDoughnut,
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
}
showCharDoughnut();
