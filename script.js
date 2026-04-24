const mainPage = document.getElementById("mainPage");
const viewerPage = document.getElementById("viewerPage");
const quizPage = document.getElementById("quizPage");

const goViewerBtn = document.getElementById("goViewerBtn");
const backBtn = document.getElementById("backBtn");
const goQuizBtn = document.getElementById("goQuizBtn");
const quizBackBtn = document.getElementById("quizBackBtn");
const goMainBtn = document.getElementById("goMainBtn");

const artFrame = document.getElementById("artFrame");
const hojakdoImage = document.getElementById("hojakdoImage");

const arLaunchBtn = document.getElementById("arLaunchBtn");
const duffyViewer = document.getElementById("duffyViewer");

const quizOptions = document.querySelectorAll(".quiz-option");
const quizResult = document.getElementById("quizResult");

const captureBtn = document.getElementById("captureBtn");
const shareBtn = document.getElementById("shareBtn");

let quizAnswered = false;

function showPage(page) {
  [mainPage, viewerPage, quizPage].forEach((p) => p.classList.remove("active"));
  page.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

goViewerBtn.addEventListener("click", () => showPage(viewerPage));
backBtn.addEventListener("click", () => showPage(mainPage));
goQuizBtn.addEventListener("click", () => showPage(quizPage));
quizBackBtn.addEventListener("click", () => showPage(viewerPage));
goMainBtn.addEventListener("click", () => showPage(mainPage));

/* 호작도 확대 */
artFrame.addEventListener("mousemove", (e) => {
  const rect = artFrame.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  hojakdoImage.style.transformOrigin = `${x}% ${y}%`;
  hojakdoImage.style.transform = "scale(1.85)";
});

artFrame.addEventListener("mouseleave", () => {
  hojakdoImage.style.transformOrigin = "center center";
  hojakdoImage.style.transform = "scale(1)";
});

/* 더피 등장 버튼 클릭 → AR 모델 실행 */
arLaunchBtn.addEventListener("click", async () => {
  try {
    if (!duffyViewer) {
      alert("더피 모델을 찾을 수 없습니다.");
      return;
    }

    if (typeof duffyViewer.activateAR === "function") {
      await duffyViewer.activateAR();
    } else {
      alert(
        "이 브라우저에서는 AR 실행이 지원되지 않습니다. 모바일 기기에서 다시 시도해주세요.",
      );
    }
  } catch (error) {
    alert(
      "AR 실행이 어려워요. Android Chrome 또는 AR 지원 기기에서 다시 시도해주세요.",
    );
  }
});

/* 퀴즈 */
quizOptions.forEach((button) => {
  button.addEventListener("click", () => {
    if (quizAnswered) return;

    quizAnswered = true;
    const isCorrect = button.dataset.correct === "true";

    quizOptions.forEach((option) => {
      const correct = option.dataset.correct === "true";

      if (correct) {
        option.classList.add("correct");
      } else if (option === button && !isCorrect) {
        option.classList.add("wrong");
      }
    });

    quizResult.textContent = isCorrect
      ? "정답입니다! 호작도에는 보통 호랑이와 까치가 등장해요."
      : "아쉬워요. 정답은 ‘토끼’입니다.";
  });
});

/* 사진 / 공유 */
captureBtn.addEventListener("click", () => {
  alert("사진 다시 찍기 유도 버튼입니다.");
});

shareBtn.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "호작도 x 더피 AR 체험",
        text: "호작도와 더피 AR 체험을 해봤어요!",
        url: window.location.href,
      });
    } catch (e) {}
  } else {
    alert("공유 기능이 실행된다고 가정한 화면입니다.");
  }
});
