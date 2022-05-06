import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Anchor from "@ui/anchor";
import { Spinner, Table } from "react-bootstrap";
import { SectionTitleType } from "@utils/types";
import { getEllipsisTxt } from "@helpers/formatters";
import { GetTransHistory } from "@hooks/UseAPI";
import Pagination from "@components/pagination-02";

const POSTS_PER_PAGE = 10;

const TransactionArea = ({ className, space, id, data }) => {
    const [transData, setTransData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [dataList, setDataList] = useState([]);

    useEffect(async () => {
        await GetTransHistory(POSTS_PER_PAGE, setDataList, setNumberOfPages);
    }, []);

    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const creatorHandler = useCallback(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        setTransData(dataList.slice(start, start + POSTS_PER_PAGE));
    }, [currentPage, dataList]);

    useEffect(() => {
        creatorHandler();
    }, [currentPage, creatorHandler]);

    return (
        <div
            className={clsx(
                "rn-collection-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            id={id}
        >
            <div className="container">
                <div className="row mb--50 align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        {data?.section_title && (
                            <SectionTitle
                                className="mb--0"
                                {...data.section_title}
                            />
                        )}
                    </div>
                    {!data.fetchAll && (
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
                            <div
                                className="view-more-btn text-start text-sm-end"
                                data-sal-delay="150"
                                data-sal="slide-up"
                                data-sal-duration="800"
                            >
                                <Anchor
                                    className="btn-transparent"
                                    path="/history"
                                >
                                    VIEW ALL
                                    <i className="feather feather-arrow-right" />
                                </Anchor>
                            </div>
                        </div>
                    )}
                </div>
                <div className="row g-5 trans-Tbox">
                    <Table responsive className="trans-Table">
                        <thead>
                            <tr
                                style={{
                                    fontWeight: "bold",
                                    color: "#fff",
                                }}
                            >
                                <th>Event</th>
                                <th>Price</th>
                                <th>From</th>
                                <th>To</th>
                                <th>TokenId</th>
                                <th>Transaction</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transData.length ? (
                                transData.map((historyData) => (
                                    <tr className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <td style={{ color: "#fff" }}>
                                            {historyData?.event}
                                        </td>
                                        <td>{historyData?.price}</td>
                                        <td>
                                            <a
                                                href={`https://mumbai.polygonscan.com/address/${historyData?.from}`}
                                                target="_blank"
                                            >
                                                {getEllipsisTxt(
                                                    historyData?.from,
                                                    4
                                                )}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href={`https://mumbai.polygonscan.com/address/${historyData?.to}`}
                                                target="_blank"
                                            >
                                                {getEllipsisTxt(
                                                    historyData?.to,
                                                    4
                                                )}
                                            </a>
                                        </td>
                                        <td>{historyData?.tokenId}</td>
                                        <td>
                                            <a
                                                href={`https://mumbai.polygonscan.com/tx/${historyData?.transaction}`}
                                                target="_blank"
                                            >
                                                {getEllipsisTxt(
                                                    historyData?.transaction,
                                                    4
                                                )}
                                            </a>
                                        </td>
                                        <td>{historyData?.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="md"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Fethcing Data...
                                </>
                            )}
                        </tbody>
                    </Table>
                    {data.fetchAll && (
                        <div className="row" style={{ paddingBottom: "30px" }}>
                            <div
                                className="col-lg-12"
                                data-sal="slide-up"
                                data-sal-delay="950"
                                data-sal-duration="800"
                            >
                                <Pagination
                                    currentPage={currentPage}
                                    numberOfPages={numberOfPages}
                                    onClick={paginationHandler}
                                />
                            </div>
                        </div>
                        // <Pagination>
                        //     {current.page === 1 ? (
                        //         <>
                        //             <Pagination.First disabled />
                        //             <Pagination.Prev disabled />
                        //         </>
                        //     ) : (
                        //         <>
                        //             <Pagination.First
                        //                 onClick={() => {
                        //                     handlePage("first");
                        //                 }}
                        //             />
                        //             <Pagination.Prev
                        //                 onClick={() => {
                        //                     handlePage("prev");
                        //                 }}
                        //             />
                        //         </>
                        //     )}
                        //     <Pagination.Item active>
                        //         {current.page}
                        //     </Pagination.Item>
                        //     {current.page === Math.ceil(totalCnt / 10) ? (
                        //         <>
                        //             <Pagination.Next disabled />
                        //             <Pagination.Last disabled />
                        //         </>
                        //     ) : (
                        //         <>
                        //             <Pagination.Next
                        //                 onClick={() => {
                        //                     handlePage("next");
                        //                 }}
                        //             />
                        //             <Pagination.Last
                        //                 onClick={() => {
                        //                     handlePage("last");
                        //                 }}
                        //             />
                        //         </>
                        //     )}
                        // </Pagination>
                    )}
                </div>
            </div>
        </div>
    );
};

TransactionArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        fetchAll: PropTypes.bool,
    }),
};
TransactionArea.defaultProps = {
    space: 1,
};

export default TransactionArea;
