import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const en = {
  hero: {
    role: "Software Engineer",
    name: "José Daniel García Suero",
    description: "Crafting high-performance digital solutions with 4 years of expertise. I specialize in building scalable applications that bridge the gap between complex logic and human-centric design.",
    exploreWork: "Explore My Work",
    getInTouch: "Get in Touch"
  },
  about: {
    title: "About Me",
    subtitle: "The Developer Behind The Code",
    paragraph1: "Hello! I'm Jose, a passionate software engineer with 4 years of experience building robust and scalable applications. I specialize in creating efficient solutions that solve real-world problems.",
    paragraph2: "My journey in software development has equipped me with a diverse skill set and a deep understanding of modern development practices. I'm constantly learning and adapting to new technologies to stay at the forefront of the industry.",
    paragraph3: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community."
  },
  tech: {
    title: "Toolkit",
    subtitle: "Tools & Technologies",
    description: "A curated list of technologies I use to bring ideas to life. Always curious and constantly evolving my stack."
  },
  projects: {
    title: "Portfolio",
    subtitle: "Some Featured Work",
    viewAll: "View All Projects",
    code: "Code",
    liveDemo: "Live Demo"
  },
  contact: {
    title: "Connect",
    subtitle: "Get In Touch",
    description: "Interested in working together or just want to say hi? Feel free to reach out through any of the channels below.",
    sendMessage: "Send a Message",
    connectWithMe: "Connect With Me",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    availability: "Availability",
    available: "Available for new opportunities",
    subject: "Subject",
    message: "Message",
    sendButton: "Send Message"
  },
  navbar: {
    about: "about",
    projects: "projects",
    tech: "tech",
    contact: "contact",
    resume: "Resume"
  },
  footer: {
    description: "Building digital excellence with precision and passion.",
    copyright: "José Daniel García Suero"
  },
  projectsData: {
    sig: {
      title: "Geographic Information System for Sugarcane Industry",
      description: "GIS designed for help in the decision making process in the Sugarcane Industry.",
      longDescription: "This comprehensive GIS system includes real-time communication and integration with legacy systems. It provides spatial analysis tools specifically tailored for the sugarcane industry, helping optimize planting, harvesting and logistics.",
      challenges: "Integrating with multiple legacy systems required developing custom middleware. The biggest challenge was ensuring real-time data synchronization across all components while maintaining performance.",
      features: [
        "Real-time data visualization",
        "Integration with legacy systems",
        "Custom spatial analysis tools",
        "Role-based access control"
      ],
      role: "Lead Developer"
    },
    djangoGenerator: {
      title: "Django Generator",
      description: "Automatically generate Django applications from YAML config.",
      longDescription: "This package allows you to automatically generate Django applications and models from a YAML configuration file, streamlining your development process by defining your data structure declaratively.",
      challenges: "Parsing complex YAML structures and generating valid Django code required careful validation and error handling. I implemented a multi-phase validation system to ensure generated code would work correctly and a custom IDE browser using Monaco Editor.",
      features: [
        "YAML to Django model conversion",
        "Support for complex relationships",
        "Customizable templates",
        "Validation and error reporting"
      ],
      role: "Full Stack Developer"
    },
    djangoErdDesigner: {
      title: "Django ERD Designer",
      description: "Visual ERD designer for Django applications.",
      longDescription: "A web-based tool that allows developers to design Entity-Relationship Diagrams (ERD) visually and automatically generate complete Django applications from them. The tool connects with django-generator to transform the visual diagram into fully functional Django models, migrations, and admin configurations. It supports all Django model field types, relationships, and common model patterns.",
      challenges: "The main challenge was creating an intuitive interface for complex model relationships while ensuring the generated code follows Django best practices. I implemented a custom drag-and-drop interface with real-time validation and used a two-way conversion system between the visual diagram and the underlying data structure.",
      features: [
        "Interactive ERD diagram builder with drag-and-drop interface",
        "Support for all Django field types and relationships",
        "Real-time code preview as you design",
        "Export to full Django application via django-generator",
        "Import existing Django models to visualize",
        "Customizable templates for common patterns",
        "Collaborative editing capabilities"
      ],
      role: "Full Stack Developer"
    }
  },
  techCategories: {
    Frontend: "Frontend",
    Backend: "Backend",
    Database: "Database",
    DevOps: "DevOps",
    Tools: "Tools"
  },
  yearsExperience: "years of experience"
};

const es = {
  hero: {
    role: "Ingeniero de Software",
    name: "José Daniel García Suero",
    description: "Creando soluciones digitales de alto rendimiento con 4 años de experiencia. Me especializo en construir aplicaciones escalables que unen la brecha entre lógica compleja y diseño centrado en el humano.",
    exploreWork: "Explora Mi Trabajo",
    getInTouch: "Ponte en Contacto"
  },
  about: {
    title: "Sobre Mí",
    subtitle: "El Desarrollador Detrás del Código",
    paragraph1: "¡Hola! Soy Jose, un apasionado ingeniero de software con 4 años de experiencia creando aplicaciones robustas y escalables. Me especializo en crear soluciones eficientes que resuelven problemas del mundo real.",
    paragraph2: "Mi trayectoria en desarrollo de software me ha equipado con un conjunto diverso de habilidades y una profunda comprensión de las prácticas modernas de desarrollo. Estoy constantemente aprendiendo y adaptándome a nuevas tecnologías para estar a la vanguardia de la industria.",
    paragraph3: "Cuando no estoy programando, puedes encontrarme explorando nuevas tecnologías, contribuyendo a proyectos de código abierto, o compartiendo mi conocimiento con la comunidad de desarrolladores."
  },
  tech: {
    title: "Herramientas",
    subtitle: "Herramientas y Tecnologías",
    description: "Una lista curada de tecnologías que uso para dar vida a las ideas. Siempre curioso y evolucionando constantemente mi conjunto de herramientas."
  },
  projects: {
    title: "Portafolio",
    subtitle: "Algunos Trabajos Destacados",
    viewAll: "Ver Todos los Proyectos",
    code: "Código",
    liveDemo: "Demo en Vivo"
  },
  contact: {
    title: "Conectar",
    subtitle: "Ponte en Contacto",
    description: "¿Interesado en trabajar juntos o solo quieres saludar? No dudes en contactarme a través de cualquiera de los canales a continuación.",
    sendMessage: "Enviar un Mensaje",
    connectWithMe: "Conecta Conmigo",
    email: "Correo",
    github: "GitHub",
    linkedin: "LinkedIn",
    availability: "Disponibilidad",
    available: "Disponible para nuevas oportunidades",
    subject: "Asunto",
    message: "Mensaje",
    sendButton: "Enviar Mensaje"
  },
  navbar: {
    about: "sobre mí",
    projects: "proyectos",
    tech: "tecnologías",
    contact: "contacto",
    resume: "Currículum"
  },
  footer: {
    description: "Construyendo excelencia digital con precisión y pasión.",
    copyright: "José Daniel García Suero"
  },
  projectsData: {
    sig: {
      title: "Sistema de Información Geográfica para la Industria Azucarera",
      description: "SIG diseñado para ayudar en el proceso de toma de decisiones en la Industria Azucarera.",
      longDescription: "Este sistema SIG integral incluye comunicación en tiempo real e integración con sistemas heredados. Proporciona herramientas de análisis espacial específicamente adaptadas para la industria azucarera, ayudando a optimizar la siembra, cosecha y logística.",
      challenges: "La integración con múltiples sistemas heredados requirió desarrollar middleware personalizado. El mayor desafío fue asegurar la sincronización de datos en tiempo real en todos los componentes mientras se mantenía el rendimiento.",
      features: [
        "Visualización de datos en tiempo real",
        "Integración con sistemas heredados",
        "Herramientas de análisis espacial personalizadas",
        "Control de acceso basado en roles"
      ],
      role: "Desarrollador Líder"
    },
    djangoGenerator: {
      title: "Generador Django",
      description: "Genera automáticamente aplicaciones Django desde configuración YAML.",
      longDescription: "Este paquete permite generar automáticamente aplicaciones y modelos Django desde un archivo de configuración YAML, agilizando tu proceso de desarrollo definiendo tu estructura de datos de manera declarativa.",
      challenges: "Analizar estructuras YAML complejas y generar código Django válido requirió validación y manejo de errores cuidadosos. Implementé un sistema de validación multifase para asegurar que el código generado funcionaría correctamente y un navegador IDE personalizado usando Monaco Editor.",
      features: [
        "Conversión de YAML a modelo Django",
        "Soporte para relaciones complejas",
        "Plantillas personalizables",
        "Validación y reporte de errores"
      ],
      role: "Desarrollador Full Stack"
    },
    djangoErdDesigner: {
      title: "Diseñador ERD Django",
      description: "Diseñador visual ERD para aplicaciones Django.",
      longDescription: "Una herramienta web que permite a los desarrolladores diseñar Diagramas de Entidad-Relación (ERD) visualmente y generar automáticamente aplicaciones Django completas a partir de ellos. La herramienta se conecta con django-generator para transformar el diagrama visual en modelos Django completamente funcionales, migraciones y configuraciones de admin. Soporta todos los tipos de campo de modelo Django, relaciones y patrones comunes de modelo.",
      challenges: "El desafío principal fue crear una interfaz intuitiva para relaciones complejas de modelos mientras se aseguraba que el código generado sigue las mejores prácticas de Django. Implementé una interfaz personalizada de arrastrar y soltar con validación en tiempo real y usé un sistema de conversión bidireccional entre el diagrama visual y la estructura de datos subyacente.",
      features: [
        "Constructor de diagramas ERD interactivo con interfaz de arrastrar y soltar",
        "Soporte para todos los tipos de campo Django y relaciones",
        "Vista previa de código en tiempo real mientras diseñas",
        "Exportar a aplicación Django completa vía django-generator",
        "Importar modelos Django existentes para visualizar",
        "Plantillas personalizables para patrones comunes",
        "Capacidades de edición colaborativa"
      ],
      role: "Desarrollador Full Stack"
    }
  },
  techCategories: {
    Frontend: "Frontend",
    Backend: "Backend",
    Database: "Base de Datos",
    DevOps: "DevOps",
    Tools: "Herramientas"
  },
  yearsExperience: "años de experiencia"
};

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;