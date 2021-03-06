let plays = {
    "hamlet" : {"name":"Hamlet", "type":"tragedy"},
    "as-like" : {"name":"As You Like It", "type":"comedy"},
    "othello" : {"name":"Othello", "type":"tragedy"}
}

let invoice = [
    {
        "customer" : "BigCo",
        "performances" : [
            {
                "playID" : "hamlet",
                "audience" : 55
            },
            {
                "playID" : "as-like",
                "audience" : 35
            },
            {
                "playID" : "othello",
                "audience" : 40
            }
        ]
    }
]

function statement(invoices, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명 : ${invoices.customer})\n`;

    for (let perf of invoices.performances) {
        volumeCredits += volumeCreditsFor(perf);
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }

    result += `총액 : ${format(totalAmount/100)}\n`;
    result += `적립 포인트 : ${volumeCredits}점\n`;
    return result;

    function amountFor(aPerformance) {
        let result = 0;
        switch (playFor(perf).type) {
            case "tragedy" :
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break ;
            case "comedy" :
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * perf.audience;
                break ;
            default :
                throw new Error(`알 수 없는 장르 : ${playFor(perf).type}`)
        }
        return result;
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(perf.audience - 30, 0);
        if ("comedy" == playFor(perf).type)
        result += Math.floor(perf.audience / 5);
        return result;
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",{style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100);
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
}