const cursos = [
    {
        assunto: 'CSE',
        numero: 110,
        titulo: 'Introduction to Programming',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        tecnologia: [
            'Python'
        ],
        concluido: true
    },
    {
        assunto: 'WDD',
        numero: 130,
        titulo: 'Web Fundamentals',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        tecnologia: [
            'HTML',
            'CSS'
        ],
        concluido: true
    },
    {
        assunto: 'CSE',
        numero: 111,
        titulo: 'Programming with Functions',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        tecnologia: [
            'Python'
        ],
        concluido: true
    },
    {
        assunto: 'CSE',
        numero: 210,
        titulo: 'Programming with Classes',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        tecnologia: [
            'C#'
        ],
        concluido: false
    },
    {
        assunto: 'WDD',
        numero: 131,
        titulo: 'Dynamic Web Fundamentals',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        tecnologia: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        concluido: true
    },
    {
        assunto: 'WDD',
        numero: 231,
        titulo: 'Frontend Web Development I',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        tecnologia: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        concluido: false
    }
];

const totalCreditos = 0;
criarCards(cursos);

function criarCards(cursosF) {

    document.querySelector(".container-cursos").innerHTML = '';
    cursosF.forEach(curso => {
        // Cria os elementos html
        let card = document.createElement("section");
        card.classList.add("section-cursos");
        let nomeCurso = document.createElement("h3");

        // Preenche os dados com os valores do array de templos
        nomeCurso.textContent = `${curso.assunto} ${curso.numero}`;


        // Adiciona os elementos ao cartão
        card.appendChild(nomeCurso);

        if (curso.concluido) {
            card.classList.add("concluido");
        }

        document.querySelector(".container-cursos").appendChild(card);
        // Adiciona o cartão ao documento
    });

    mostrarTotalCreditos(cursosF);

}

function mostrarTotalCreditos(lista) {
    const total = lista.reduce((soma, curso) => soma + curso.creditos, 0);
    document.querySelector("#total-creditos").textContent = total;
}

const botaoTodos = document.querySelector("#botao-todos");
const botaoCse = document.querySelector("#botao-cse");
const botaoWdd = document.querySelector("#botao-wdd");

botaoTodos.addEventListener('click', () => {
    criarCards(cursos);
})
botaoCse.addEventListener('click', () => {
    const filtrados = cursos.filter(curso => curso.assunto === 'CSE');
    criarCards(filtrados);
})
botaoWdd.addEventListener('click', () => {
    const filtrados = cursos.filter(curso => curso.assunto === 'WDD');
    criarCards(filtrados);
});



