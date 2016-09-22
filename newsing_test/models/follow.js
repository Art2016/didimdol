module.exports.listFollowing = function(page, count, callback) {
  callback(null, {
    "results": [
      {
        "id": 1,
        "pf_url": "http://.../images/user/id/pf_picture.bmp",
        "name": "이임수",
        "aboutme": "자기소개",
        "flag": false
      },
      {
        "id": 2,
        "pf_url": "http://.../images/user/id/pf_picture.bmp",
        "name": "서창욱",
        "aboutme": "자기소개",
        "flag": true
      },
      {
        "id": 3,
        "pf_url": "http://.../images/user/id/pf_picture.bmp",
        "name": "임지수",
        "aboutme": "자기소개",
        "flag": false
      },
      {
        "id": 4,
        "pf_url": "http://.../images/user/id/pf_picture.bmp",
        "name": "신미은",
        "aboutme": "자기소개",
        "flag": true
      },
    ]
  });
};

module.exports.listFollower = function(page, count, callback) {
  callback(null, {
    "results": [
      {
        "id": 5,
        "pf_url": "http://.../images/user/id/pf_picture.bmp",
        "name": "정다솜",
        "aboutme": "자기소개",
        "flag": true
      },
      {
        "id": 6,
        "pf_url": "http://.../images/user/id/pf_picture.bmp",
        "name": "이혜람",
        "aboutme": "자기소개",
        "flag": false
      },
      {
        "id": 7,
        "pf_url": "http://.../images/user/id/pf_picture.bmp",
        "name": "김예진",
        "aboutme": "자기소개",
        "flag": true
      }
    ]
  });
};

module.exports.createFollow = function(id, id_o, callback) {
  callback(null, {
    "results": "팔로우를 하였습니다."
  });
};

module.exports.removeFollow = function(id, callback) {
  callback(null, {
    "results": "팔로우가 정상적으로 해제되었습니다."
  });
};