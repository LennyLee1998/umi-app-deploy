import { Button } from 'antd';
import { connect } from 'umi';

const CatePub = (props: any) => {
  console.log(props);
  return (
    <div>
      <span>{props.count.num}</span>
      <Button
        onClick={() =>
          props.dispatch({
            type: 'count/addNumAsync',
            payload: {
              name: 'lenny',
            },
          })
        }
      >
        lova
      </Button>
      {/* {num} */}
    </div>
  );
};

export default connect(({ count }) => ({ count }))(CatePub);
