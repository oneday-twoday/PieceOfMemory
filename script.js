// 스크롤 애니메이션

gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".fade-item").forEach((item) => {
  gsap.fromTo(item,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        end: "top 60%",
        scrub: true,
        // markers: true // 디버그용
      }
    }
  );
});

gsap.utils.toArray(".bounce-in").forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top 90%",
    onEnter: () => {
      item.classList.add("bounce-in");
    },
    onLeaveBack: () => {
      item.classList.remove("bounce-in");
    }
  });
});




// 1. GNB

//상단바 메뉴 색상 변경
const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');

  function updateNavbarColor() {
    let currentSection = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 60 && rect.bottom >= 60) {
        currentSection = section;
      }
    });

    if (currentSection) {
      if (currentSection.classList.contains('bg-dark')) {
        navbar.classList.remove('light-text');
        navbar.classList.add('dark-text');
      } else {
        navbar.classList.remove('dark-text');
        navbar.classList.add('light-text');
      }
    }
  }

  window.addEventListener('scroll', updateNavbarColor);
  window.addEventListener('load', updateNavbarColor);


// GNB 메뉴 누르면 해당 위치로 이동
document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 3. 배경


const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
        const { width, height, ctx } = chart;
        ctx.save();

        // 설정
        const text = "약 97만명";
        const fontSize = 28; // 차트 크기에 비례한 폰트 크기
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = "#B7B2B3";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // 차트 중심 구하기
        const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
        const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

        // 약간 아래로 보정
        ctx.fillText(text, centerX, centerY + 5); // 필요 시 +5를 조정
        ctx.restore();
    }
};


// 도넛 차트
new Chart(document.getElementById("donutChart"), {
    type: 'doughnut',
    data: {
        labels: ["65~69세", "70~74세","75~79세","80~84세","85세 이상"],
        datasets: [{
        data: [16.2, 13.6, 23.1, 25.2, 22.9], // 97만명 기준으로 분할
        backgroundColor: [
  '#83234a',  // 65~69세 (가장 어두운 핑크)
  '#a03a68',  // 70~74세
  '#c05686',  // 75~79세
  '#ff4fa1',  // 80~84세 (최고값, 밝은 핑크)
  '#ff87c2'   // 85세 이상 (가장 밝은 핑크)
],
        borderWidth: 0
        }]
    },
    options: {
    cutout: '60%',
    plugins: {
        legend: {
        position: 'left',
        labels: {
        color: '#fff',
        boxWidth: 16,
        padding: 16,
        font: {
            size: 16
            }
        }
    },
    datalabels: {
        color: '#fff', // ← 글씨 색상
        font: {
        weight: 'bold',
        size: 16
        },
        formatter: (value) => `${value}%`
    }
    }
    },
    plugins: [ChartDataLabels]
});


// 막대 차트
new Chart(document.getElementById("barChart"), {
    type: 'bar',
    data: {
        labels: ["2022", "2025", "2026", "2030", "2044"],
        datasets: [{
        data: [93, 97, 100, 120, 200],
        backgroundColor: ['#a67588', '#ff4fa1', '#a67588', '#a67588', '#a67588'],
        borderRadius: 12, //둥근 막대
        barPercentage: 0.7,  // 막대 너비 조절 (0~1 사이)
        categoryPercentage: 0.8 // 막대 간 간격 조절
        }]
    },
    options: {
        maintainAspectRatio: false,
        layout: {
    padding: { top: 30 } // 상단에 여백 주기
        },
        plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: { //막대 위 숫자 표시
            anchor: 'end',
            align: 'start',
            offset : -25,
            color: '#B7B2B3',
            font: {
            weight: 'bold',
            size: 14
            },
            formatter: (value) => `약 ${value}만 명`
        }
        },
        
        scales: {
        y: {
            display: false, //y축 제거
            beginAtZero: true,
        },
        x: {
            ticks: {
            color: "#B7B2B3",
            }
        }
        }
    },
    plugins: [ChartDataLabels]
});


//폰트 소개 영역
const dynamicText = document.getElementById("dynamicText");
const weightSlider = document.getElementById("weightSlider");
const sizeSlider = document.getElementById("sizeSlider");
const fontSizeLabel = document.getElementById("fontSizeLabel");
const weightLabels = document.querySelectorAll(".weight-options label");

// 초기값
weightSlider.value = 700;
sizeSlider.value = 34.0;

weightSlider.addEventListener("input", () => {
  const weight = parseInt(weightSlider.value);
  dynamicText.style.fontWeight = weight;

  weightLabels.forEach(label => {
    label.classList.toggle("selected", parseInt(label.dataset.weight) === weight);
  });
});

sizeSlider.addEventListener("input", () => {
  const size = parseFloat(sizeSlider.value).toFixed(1);
  fontSizeLabel.textContent = size;
  dynamicText.style.fontSize = `${size}px`;
});

