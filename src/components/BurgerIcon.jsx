/* eslint-disable react/prop-types */
export default function BurgerIcon({
  burgerIcon,
  onClick,
  handleNameClick,
  handleLinkClick,
  handleProjectTypeClick,
  handleProjectBudgetClick,
  handleBidClick,
  handleCountryClick,
  handleCreatedClick,
  handleCreatedByClick,
  handleBidDelayClick,
  handleProjectStatusClick,
  handleDealStatusClick,
  name,
  link,
  projectType,
  projectBudget,
  bid,
  country,
  created,
  createdBy,
  bidDelay,
  projectStatus,
  dealStatus,
  lists,
}) {
//   const lists = [
//     { name: "Name", handler: handleNameClick, state: name },
//     { name: "Link", handler: handleLinkClick, state: link },
//     {
//       name: "Project Type",
//       handler: handleProjectTypeClick,
//       state: projectType,
//     },
//     {
//       name: "Project Budget",
//       handler: handleProjectBudgetClick,
//       state: projectBudget,
//     },
//     { name: "Bid", handler: handleBidClick, state: bid },
//     { name: "Country", handler: handleCountryClick, state: country },
//     { name: "Created", handler: handleCreatedClick, state: created },
//     { name: "CreatedBy", handler: handleCreatedByClick, state: createdBy },
//     { name: "Bid Delay", handler: handleBidDelayClick, state: bidDelay },
//     {
//       name: "Project Status",
//       handler: handleProjectStatusClick,
//       state: projectStatus,
//     },
//     { name: "Deal Status", handler: handleDealStatusClick, state: dealStatus },
//   ];

  return (
    <div className="relative">
      <div
        className="flex justify-end px-6 text-xl font-bold cursor-pointer"
        onClick={onClick}
      >
        {burgerIcon ? "=" : "X"}
      </div>
      {!burgerIcon ? (
        <div className="absolute right-0 z-10 flex flex-col gap-4 px-12 py-4 shadow-xl bg-slate-200 rounded-xl">
          {lists.map(({ name, handler, state }) => (
            <div key={name}>
              <input
                type="checkbox"
                checked={state} 
                onChange={() => handler()}
              />
              <span className="ml-4">{name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

