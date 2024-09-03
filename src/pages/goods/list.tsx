import { Button } from 'antd';
import { Component } from 'react';
import { connect } from 'umi';
class GoodsList extends Component {
  render() {
    console.log(this.props);
    const { num, dispatch } = this.props;
    const handleIncrement = () => {
      dispatch({
        type: 'count/increment',
        payload: {
          increNum: 6,
          name: 'lenny',
        },
      });
    };
    const handleDecrement = () => {
      dispatch({
        type: 'count/decrement',
        payload: 5,
      });
    };
    return (
      <div>
        <span>{num}</span>
        <Button onClick={handleIncrement}>+1</Button>
        <Button onClick={handleDecrement}>-1</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ count }) => ({
  num: count.num,
});
export default connect(mapStateToProps)(GoodsList);
