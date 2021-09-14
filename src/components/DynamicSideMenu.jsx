import react from "react";
<List className={classes.list}>
  <ListItem
    button
    selected={selectedIndex === 4}
    onClick={(event) => {
      history.push(`/`);
      handleListItemClick(event, 4);
    }}
  >
    <ListItemText primary="صفحه اصلی" />
  </ListItem>
  {branch.map((item, index) => (
    <React.Fragment key={item.id}>
      <ListItem
        button
        key={item.id}
        selected={selectedIndex === item.id}
        onClick={(event) => {
          handleExpand(item.name);
          typeof subBranch[index] != "undefined" &&
            subBranch[index].length === 0 &&
            history.push(`/categories/${item.id}/${item.name}`);
        }}
      >
        <ListItemText primary={item.name} />
        {typeof subBranch[index] != "undefined" &&
        subBranch[index].length > 0 ? (
          openSubBranch[item.name] ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItem>
      <Collapse in={openSubBranch[item.name]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {typeof subBranch[index] != "undefined" &&
            subBranch[index].length !== 0 &&
            subBranch[index].map((sub) => (
              <ListItem
                button
                className={classes.nested}
                key={sub.id}
                onClick={(event) => {
                  history.push(`/categories/${sub.id}/${sub.name}`);
                  handleListItemClick(event, sub.id);
                }}
              >
                <ListItemText primary={sub.name} />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </React.Fragment>
  ))}
</List>;
