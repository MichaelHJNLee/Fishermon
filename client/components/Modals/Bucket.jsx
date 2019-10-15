import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const StyledBucket = styled.div`
  display: flex;
  position: absolute;
  z-indez: 10;
  height: 350px;
  width: 280px;
  background: white;
  left: 15%;
  top: 10.5%;
  flex-flow: row wrap;
  align-content: flex-start;
`;

const BucketItem = styled.div`
  height: 70px;
  width: 70px;
  margin: 0;
`;

const Pages = styled.div`
  position: absolute;
  left: -13.5%;
  top: 95.3%;
`;

class Bucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bucket: [],
      pageCount: 0,
      currentPage: 1,
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      bucket: this.props.bucket,
      pageCount: Math.ceil(this.props.bucket.length / 20)
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.bucket !== prevProps.bucket) {
      if (this.state.currentPage === Math.ceil(this.props.bucket.length / 20)) {
        this.setState({
          bucket: this.props.bucket,
          pageCount: Math.ceil(this.props.bucket.length / 20),
        })
      } else if (this.state.currentPage > Math.ceil(this.props.bucket.length / 20)) {
        this.setState({
          bucket: this.props.bucket,
          pageCount: Math.ceil(this.props.bucket.length / 20),
          currentPage: this.state.currentPage - 1,
        })
      } else {
        this.setState({
          bucket: this.props.bucket,
          pageCount: Math.ceil(this.props.bucket.length / 20),
          currentPage: this.state.currentPage,
        })
      }
    }
  }

  handlePageClick(e) {
    this.setState({
      currentPage: e.selected + 1
    })
  }

  render() {
    let end = this.state.currentPage * 20;
    return(
      <StyledBucket>
        {this.state.bucket.slice(end - 20, end).map((item, index) => {
          let color = 'sprites';
          let id = item;
          let shiny = 0;
          if (id >= 1000) {
            color = 'shiny';
            id = id / 1000;
            shiny = 1;
          }
          return (<BucketItem key={index}><img id={shiny} src={`/${color}/${id}.png`} style={{"height": "100%", "width": "100%"}} onClick={(e) => {this.props.displayPokemonInfo(e)}} /></BucketItem>)
        })}
      <Pages>
          <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={0}
              pageRangeDisplayed={4}
              onPageChange={(e) => {this.handlePageClick(e)}}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
            />
        </Pages>
      </StyledBucket>
    )
  }
}

export default Bucket;