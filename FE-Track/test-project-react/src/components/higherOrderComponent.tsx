const withBorder = (Component) => {
  return (props) => {
    return (
      <div>
        <Component {...props} />
      </div>
    );
  };
};

export default withBorder;
