

export let paginationAction = {

    pagination: (pageLength: number, pageNumber: number): IPagination => {


        let pageNo = pageNumber;
        let PageL = pageLength;

        if (!PageL) {
            PageL = 10
        } else if (PageL <= -1) {
            PageL = 10
        }

        if (!pageNo) {
            pageNo = 0
        } else if (pageNo <= -1) {
            pageNo = 0
        } else {
            pageNo = (pageNo - 1) * PageL
        }





        return {
            pageLength: PageL,
            pageNumber: pageNo
        }

    }
}

export interface IPagination {
    pageLength: number
    pageNumber: number
}