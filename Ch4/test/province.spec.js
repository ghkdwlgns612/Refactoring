const { Province, sampleProvinceData } = require("../Province");

const { assert, expect } = require("chai");

describe("province", function () {
    let asia;
    beforeEach(function () {
        asia = new Province(sampleProvinceData());
    });
    // 생산 부족분을 제대로 계산하는지
    it("shortfall", function () {
        assert.equal(asia.shortfall, 5);
    });

    // 초기 픽스처로부터 총수익이 제대로 계산되는지
    it("profit", function () {
        assert.equal(asia.profit, 230);
    });

    // change production
    it("change production", function () {
        asia.producers[0].production = 20;
        expect(asia.shortfall).equal(-6);
        expect(asia.profit).equal(292);
    });

    // 수요가 없다.
    it("zero demand", function () {
        asia.demand = 0;
        expect(asia.shortfall).equal(-25);
        expect(asia.profit).equal(0);
    });

    // 수요가 마이너스다.
    it("negative demand", function () {
        asia.demand = -1;
        expect(asia.shortfall).equal(-26);
        expect(asia.profit).equal(-10);
    });

    // 수요 입력란이 비어 있다.
    it("empty string demand", function () {
        asia.demand = "";
        expect(asia.shortfall).NaN;
        expect(asia.profit).NaN;
    });
});

describe("no producer", function () {
    let noProducers;
    beforeEach(function () {
        const data = {
            name: "No producers",
            producers: [],
            demand: 30,
            price: 20,
        };
        noProducers = new Province(data);
    });

    // 생산 부족분을 제대로 계산하는지 확인. 생산자가 없으니 30이 맞다.
    it("shortfall", function () {
        assert.equal(noProducers.shortfall, 30);
    });

    // 초기 픽스처로부터 총수익이 제대로 계산되는지 확인. 인건비 270이니 총 600입니다. 230이다.
    it("profit", function () {
        assert.equal(noProducers.profit, 0);
    });
});

describe("string for producers", function () {
  // 생산자 수 필드에 문자열을 대입한다.
  it("", function () {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0);
  });
});
