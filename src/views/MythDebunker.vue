<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-lightbulb-outline</v-icon>
            Vaccine Myth Debunker
          </v-card-title>
          <v-card-text>
            <p>Test your knowledge of vaccine facts and myths. Learn the truth behind common misconceptions about vaccines.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quiz Section -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-help-circle-outline</v-icon>
            Vaccine Facts Quiz
          </v-card-title>
          
          <v-card-text v-if="!showResults">
            <div class="d-flex justify-space-between mb-2">
              <div class="text-subtitle-1">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</div>
              <div class="text-subtitle-1">
                <v-progress-linear
                  :model-value="((currentQuestionIndex + 1) / questions.length) * 100"
                  color="primary"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>
            </div>
            
            <div class="py-4">
              <h2 class="text-h5 mb-4">{{ questions[currentQuestionIndex].question }}</h2>
              <v-radio-group v-model="questions[currentQuestionIndex].userAnswer">
                <v-radio
                  v-for="option in questions[currentQuestionIndex].options"
                  :key="option"
                  :label="option"
                  :value="option"
                ></v-radio>
              </v-radio-group>
            </div>
            
            <div class="d-flex justify-end mt-4">
              <v-btn
                color="primary"
                @click="answerQuestion(questions[currentQuestionIndex].userAnswer)"
                :disabled="!questions[currentQuestionIndex].userAnswer"
              >
                {{ currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question' }}
              </v-btn>
            </div>
          </v-card-text>
          
          <v-card-text v-else>
            <div class="text-center">
              <h2 class="text-h4 mb-4">Quiz Results</h2>
              <v-progress-circular
                :model-value="(score / questions.length) * 100"
                :size="100"
                :width="10"
                :color="score === questions.length ? 'success' : (score >= questions.length / 2 ? 'primary' : 'error')"
                class="mb-4"
              >
                {{ score }}/{{ questions.length }}
              </v-progress-circular>
              
              <p class="text-h6 mb-6">
                {{ score === questions.length ? 'Excellent! You know your vaccine facts!' : 
                   score >= questions.length / 2 ? 'Good job! You know some vaccine facts, but there\'s still more to learn.' :
                   'Time to learn more about vaccines. Check the facts below!' }}
              </p>
              
              <v-list>
                <v-list-item
                  v-for="question in questions"
                  :key="question.id"
                  :class="{
                    'bg-success-lighten-5': question.userAnswer === question.correctAnswer,
                    'bg-error-lighten-5': question.userAnswer !== question.correctAnswer
                  }"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="question.userAnswer === question.correctAnswer ? 'success' : 'error'"
                    >
                      {{ question.userAnswer === question.correctAnswer ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                  </template>
                  <v-list-item-title>{{ question.question }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Your answer: {{ question.userAnswer }} | Correct answer: {{ question.correctAnswer }}
                  </v-list-item-subtitle>
                  <div class="mt-2 text-caption">{{ question.fact }}</div>
                </v-list-item>
              </v-list>
              
              <div class="mt-6">
                <v-btn color="primary" @click="resetQuiz">Take Quiz Again</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- Myths Section -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-alert-circle-outline</v-icon>
            Common Vaccine Myths
          </v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="myth in myths"
                :key="myth.id"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon color="warning" class="me-2">{{ myth.icon }}</v-icon>
                    <span>{{ myth.myth }}</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="pa-2">
                    <div class="text-subtitle-1 mb-2">FACT:</div>
                    <p>{{ myth.fact }}</p>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>

        
        <v-card class="mt-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-information-outline</v-icon>
            Reliable Sources
          </v-card-title>
          <v-list>
            <v-list-item
              v-for="(source, index) in [
                { name: 'World Health Organization', url: 'https://www.who.int/vaccines/' },
                { name: 'Centers for Disease Control and Prevention', url: 'https://www.cdc.gov/vaccines/' },
                { name: 'American Academy of Pediatrics', url: 'https://www.aap.org/vaccines' }
              ]"
              :key="index"
              :href="source.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <template v-slot:prepend>
                <v-icon color="info">mdi-web</v-icon>
              </template>
              <v-list-item-title>{{ source.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
          
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Quiz questions data
const questions = ref([
  {
    id: 1,
    question: "Vaccines can cause the disease they are meant to prevent.",
    fact: "Most vaccines contain either killed or weakened forms of the germs that cannot cause disease, or just specific proteins from the germ. Some vaccines can cause mild symptoms that might appear similar to the disease, but these are not the disease itself and are usually signs that the body is building immunity.",
    options: ["True", "False"],
    correctAnswer: "False",
    userAnswer: null
  },
  {
    id: 2,
    question: "Natural immunity is better than vaccine-acquired immunity.",
    fact: "While getting a disease does provide some natural immunity, the risks of this approach far outweigh the benefits. Vaccines allow you to build immunity without the risks of contracting the disease and experiencing potentially severe complications.",
    options: ["True", "False"],
    correctAnswer: "False",
    userAnswer: null
  },
  {
    id: 3,
    question: "Vaccines contain toxic ingredients that can harm you.",
    fact: "Vaccine ingredients are all tested for safety. Some ingredients like formaldehyde might sound scary, but our bodies naturally produce more formaldehyde than what's in vaccines. All ingredients serve specific purposes, like keeping the vaccine safe and effective.",
    options: ["True", "False"],
    correctAnswer: "False",
    userAnswer: null
  },
  {
    id: 4,
    question: "Vaccines can overload the immune system, especially in infants.",
    fact: "The immune system can handle many more antigens (substances that trigger immune responses) than those in vaccines. In fact, babies encounter thousands of germs every day. Even multiple vaccines in one visit don't overload the immune system.",
    options: ["True", "False"],
    correctAnswer: "False",
    userAnswer: null
  },
  {
    id: 5,
    question: "Vaccines can cause autism.",
    fact: "Extensive research over many years has found no link between vaccines and autism. The original study that suggested a link was retracted due to serious procedural and ethical flaws, and the doctor lost his medical license.",
    options: ["True", "False"],
    correctAnswer: "False",
    userAnswer: null
  }
])

// Common vaccine myths
const myths = ref([
  {
    id: 1,
    myth: "Vaccines cause autism",
    fact: "Multiple large, well-designed studies have found no link between vaccines and autism. The original study suggesting this link was retracted for methodological flaws and ethical violations.",
    icon: "mdi-auto-fix"
  },
  {
    id: 2,
    myth: "Natural immunity is always better",
    fact: "While natural infection does produce immunity, it also carries risks of severe complications and even death. Vaccines provide immunity without these risks.",
    icon: "mdi-leaf"
  },
  {
    id: 3,
    myth: "Vaccines contain dangerous toxins",
    fact: "Vaccine ingredients are present in extremely small amounts and are rigorously tested for safety. Our bodies naturally contain or process most of these ingredients regularly.",
    icon: "mdi-flask"
  },
  {
    id: 4,
    myth: "Vaccines aren't necessary anymore",
    fact: "Vaccines have been so successful that some diseases seem rare today, but without continued vaccination, these diseases would quickly return.",
    icon: "mdi-arrow-u-left-top"
  },
  {
    id: 5,
    myth: "Getting multiple vaccines overwhelms the immune system",
    fact: "The immune system can easily handle multiple vaccines. In fact, children are exposed to many more immune challenges in their daily environment than from vaccines.",
    icon: "mdi-shield"
  }
])

// Quiz logic
const currentQuestionIndex = ref(0)
const showResults = ref(false)
const score = computed(() => {
  return questions.value.filter(q => q.userAnswer === q.correctAnswer).length
})

const answerQuestion = (answer) => {
  questions.value[currentQuestionIndex.value].userAnswer = answer
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    showResults.value = true
  }
}

const resetQuiz = () => {
  questions.value.forEach(q => {
    q.userAnswer = null
  })
  currentQuestionIndex.value = 0
  showResults.value = false
}
</script>