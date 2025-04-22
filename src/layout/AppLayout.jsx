import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppLayout.style.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AppLayout = () => {

  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()

  const searchByKeyword=(event)=>{
    event.preventDefault()
    // 위 url를 바꿔준다.
    console.log("입력 키워드 ", keyword)
    navigate(`/movies?q=${keyword}`)
    setKeyword('')
  }

  return (
    <div>
    <Navbar expand="lg" className="navbar" bg="transparent" variant="dark">
    <Container fluid>
      <Navbar.Brand href="/">
        <img className="navbar-netflix-img" src="https://kreafolk.com/cdn/shop/articles/netflix-logo-design-history-and-evolution-kreafolk_149b6498-ceef-45a6-a671-f45dab16b804.jpg?v=1717725026&width=2048" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/movies">Movies</Nav.Link>
      
        </Nav>
        <Form className="d-flex" onSubmit={searchByKeyword}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 bg-black text-white"
            aria-label="Search"
            value={keyword}
            onChange={(event)=>setKeyword(event.target.value)}
          />
          <Button variant="outline-danger">Search</Button>

        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Outlet />
  </div>

  )
}

export default AppLayout