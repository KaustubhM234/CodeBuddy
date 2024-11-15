import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import Search from '../components/Search';
import "../components/Button.css"

const Docs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    scrollToLanguageProfile(searchTerm.toLowerCase());
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const scrollToLanguageProfile = (term) => {
    if (!term) {
      return; // Skip scrolling if the term is empty
    }
  
    const languageElements = document.querySelectorAll(`.${getLanguageClass(term)}`);
  
    if (languageElements.length > 0) {
      languageElements[0].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLanguageClass = (term) => {
    switch (term) {
      case 'python':
        return 'profile-python';
      case 'java':
        return 'profile-java';
      case 'javascript':
        return 'profile-javascript';
      case 'c++':
        return 'profile-cplusplus';
      case 'c':
        return 'profile-c';
      default:
        return '';
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
     <Search onSearch={handleSearch} />
    <div style={{backgroundColor:"#000000"}}>
    <div
    style={{
      backgroundColor: "#141414",
      fontFamily: "monospace",
      textAlign: "center",
      color: "#fff",
      padding: "20px",
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', margin: '0 auto', border: '2px double darkgreen'
    }}
  >
    <h2 style={{ fontSize: "39px", marginBottom: "20px" }}>
      Our Comprehensive Documentation Page
    </h2>
    <p
      style={{ fontSize: "17px", lineHeight: "1.5", marginBottom: "20px" }}
    >
      Embark on a journey through the world of programming with our
      comprehensive documentation. Discover & master five key languages:
    </p>
    <ul style={{ listStyle: "none", padding: "0" }}>
      <li style={{ fontSize: "20px", marginBottom: "10px" }}>
        🧠 C: Power for system programming & embedded systems.
      </li>
      <li style={{ fontSize: "20px", marginBottom: "10px" }}>
        🌐 C++: Versatility for performance-critical applications.
      </li>
      <li style={{ fontSize: "20px", marginBottom: "10px" }}>
        🤖 JavaScript: Fuel for modern web development.
      </li>
      <li style={{ fontSize: "20px", marginBottom: "10px" }}>
        💼 Python: Engine behind AI, machine learning, & data science.
      </li>
      <li style={{ fontSize: "20px", marginBottom: "0" }}>
        🛠️ Java: Strength for enterprise solutions.
      </li>
    </ul>
    <p style={{ fontSize: "17px", lineHeight: "1.5" }}>
      Explore the basics, web development, AI, enterprise apps, & system
      programming. Let's code the future together! 🚀
    </p>
  </div>
  <br /> <br />
  <div className='d-flex'>
    <Profile className='col-lg-4 col-md-6 col-sm-12' desc="Java: A robust, cross-platform language for building a wide range of applications. It's known for its portability and extensive libraries, making it a popular choice in enterprise software development." name="Java Programming Language" img="https://cdn.icon-icons.com/icons2/2415/PNG/512/java_original_wordmark_logo_icon_146459.png"/>
    <Profile className='col-lg-4 col-md-6 col-sm-12'img="https://cdn.picpng.com/logo/language-logo-python-44976.png" name="Python programming language" desc="Python: A versatile, high-level language celebrated for its simplicity and readability. Python is widely used in web development, data science, and automation."/>
    <Profile className='col-lg-4 col-md-6 col-sm-12'
    img="https://logospng.org/download/javascript/logo-javascript-1024.png"
     name="JavaScript programming language" 
     desc="JavaScript: The universal language of the web, enabling dynamic and interactive web applications. Its versatility extends from the frontend to server-side development.."/>
</div>
<div className='d-flex'>
    <Profile className='col-lg-4 col-md-6 col-sm-12'
     img="https://www.pngkit.com/png/full/101-1010012_download-png.png"
     name="C programming language" 
     desc="C: An efficient language from the '70s, ideal for systems, embedded, and OS development. Standardized for compatibility, it's a cornerstone in software with a lasting legacy in C++, C#, Objective-C."/>
    <Profile className='col-lg-4 col-md-6 col-sm-12'
     img="https://2.bp.blogspot.com/-S9X0kdII8wA/XEc379OE4eI/AAAAAAAAAF8/joUY66Bgzeo-1XftGrFmZUnDo8Jv6BAaQCLcBGAs/s1600/800px-ISO_C%252B%252B_Logo.svg.png"
     name="C++ programming language" 
     desc="C++: A powerful language for systems and applications, offering efficiency and versatility. It's the foundation for modern software development and shares a lineage with C."/>
    
</div>
<button onClick={scrollToTop} class="custom-btn btn-5">
          Scroll to Top
        </button>

    </div>
    </>
  )
}

export default Docs;