import React from 'react';
import PropTypes from 'prop-types';

//Material Styles
import {withStyles} from '@material-ui/core/styles';
import Button from 'components/common/Button';

const styles = theme => ({
  Pagination:{
    marginTop: '2rem',
    // 한가운데에 세로로 정렬
    display: 'flex',
    alignItems: 'center',
  },
  Number:{
    fontSize: '0.85rem',
    textAlign: 'center',
    color: '$oc-gray-6',
    flex: '1', // 남은 공간을 다 차지
  },
});

const Pagination = ({page, lastPage, tag, classes}) => {
  const createPagePath = (page) => {
    return tag? `/tag/${tag}/${page}` : `/page/${page}`;
  }
  return (
    <div className={classes.Pagination}>
    <Button disabled={page===1} to={createPagePath(page - 1)}>
      이전페이지
    </Button>
    <div className={classes.Number}>
      페이지 {page}
    </div>
    <Button disabled={page === lastPage} to={createPagePath(page + 1)}>
      다음페이지
    </Button>
  </div>
  );
}

Pagination.propTypes = {
  classes:PropTypes.object.isRequired
};

export default withStyles(styles)(Pagination);