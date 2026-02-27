// sections/ClassesSection.ts
import { mockClasses } from '../data/mockClasses';

export function ClassesSection() {
  return `
    <section id="aulas" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Título no estilo russo -->
        <div class="text-center mb-16">
          <span class="text-yellow-600 text-sm font-medium tracking-widest uppercase">NOSSAS AULAS</span>
          <h2 class="text-5xl font-bold text-gray-900 mt-4">HORÁRIOS</h2>
          <p class="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
            Escolha a turma que melhor se encaixa na sua rotina
          </p>
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-3 gap-8">
          ${mockClasses.map(aula => `
            <div class="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300">
              <!-- Tag da turma -->
              <div class="inline-block px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold mb-6">
                ${aula.turma}
              </div>
              
              <!-- Info principal -->
              <div class="mb-8">
                <div class="text-4xl font-bold text-gray-900 mb-2">${aula.horario}</div>
                <div class="text-gray-500 text-lg">${aula.dias}</div>
              </div>

              <!-- Detalhes -->
              <div class="border-t border-gray-200 pt-6">
                <p class="text-gray-400 text-sm mb-2">${aula.faixaEtaria}</p>
                <p class="text-gray-600">${aula.descricao}</p>
              </div>

              <!-- Botão -->
              <button class="mt-6 text-yellow-600 font-medium hover:text-yellow-700 transition-colors">
                Saiba mais →
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Rodapé da seção (igual ao site russo) -->
        <div class="text-center mt-16">
          <p class="text-gray-400 text-sm">
            Experimente uma aula gratuita
          </p>
        </div>
      </div>
    </section>
  `;
}